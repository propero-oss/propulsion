import {
  Document,
  FetchOptions, Filter, Filters,
  NoArgsConstructor,
  NoSuchElement,
  RepositoryBase, SetFilter,
  SingleFetchOptions, Sorter, UnsupportedOperation
} from "@propero/propulsion-core";
import {Connection, Repository, Brackets, FindManyOptions, FindOneOptions, SelectQueryBuilder} from "typeorm";

export type TypeormExtraOptions<T> = {
  findOne?: FindOneOptions<T>;
  findMany?: FindManyOptions<T>;
};

export class TypeormRepository<T, F extends keyof T, ID extends T[F]> extends RepositoryBase<T, F, ID> {

  constructor(
    protected connection: () => Connection,
    cls: NoArgsConstructor<T>,
    id: F,
    protected customRepository?: () => Repository<T>,
    protected extraOptions: TypeormExtraOptions<T> = {}
  ) { super(cls, id); }

  protected get repo(): Repository<T> {
    if (this.customRepository)
      return this.customRepository();
    return this.connection().getRepository(this.cls);
  }

  public async findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T> {
    const result = await this.repo.findOne(id, options && this.convertSingleFetchOptions(options));
    if (!result)
      throw new NoSuchElement(`No entity found for id ${id}`);
    return result;
  }

  public async findAll(options?: FetchOptions<T>): Promise<T[]> {
    const q = this.repo.createQueryBuilder("it").select();
    this.applyFetchOptions(q, options);
    return q.getMany();
  }

  public async findAllAndCount(options?: FetchOptions<T>): Promise<{count: number, data: T[]}> {
    const q = this.repo.createQueryBuilder("it").select();
    this.applyFetchOptions(q, options);
    const [data, count] = await q.getManyAndCount();
    return {data, count};
  }

  public async count(options?: FetchOptions<T>): Promise<number> {
    const q = this.repo.createQueryBuilder().select("it");
    const {filter} = {...options};
    this.applyFetchOptions(q, {filter});
    return q.getCount();
  }

  public async createOne(entity: Partial<T>): Promise<T> {
    const instance = Document.create(this.cls, entity);
    return await this.repo.save(instance);
  }

  public async createMany(entities: Partial<T>[]): Promise<T[]> {
    const instances = entities.map(entity => Document.create(this.cls, entity));
    return await this.repo.save(instances);
  }


  public async updateOne(entity: Partial<T>, partialUpdate: boolean): Promise<T> {

    const update = Document.create(this.cls, entity);
    if (!partialUpdate)
      return await this.repo.save(update);

    const id: ID = entity[this.id] as ID;
    await this.repo.createQueryBuilder()
      .update(this.cls)
      .set(update)
      .where(`${this.id} = :id`, {id})
      .execute();
    return this.findOne(id);
  }

  public async updateMany(entities: Partial<T>[], partialUpdate: boolean): Promise<T[]> {
    const updates = entities.map(entity => Document.create(this.cls, entity));

    if (!partialUpdate)
      return this.repo.save(updates);

    const ids = updates.map(one => one[this.id] as ID);
    const originals = await this.findMany(ids);

    originals.forEach(one => this.repo.merge(one, updates.find(update => update[this.id] === one[this.id])!));
    return this.repo.save(originals);
  }


  public async deleteOne(id: ID): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }

  public async deleteMany(ids: ID[]): Promise<void> {
    return this.repo.delete(ids as any[]).then(() => undefined);
  }

  protected applyFetchOptions(q: SelectQueryBuilder<T>, options?: FetchOptions<T>) {
    const {top, skip, sort, filter, fields} = {...options};
    if (fields != null) this.applyFetchOptionFields(q, fields);
    if (filter != null) this.applyFetchOptionFilters(q, filter);
    if (sort   != null) this.applyFetchOptionSorters(q, sort);
    if (top    != null) this.applyFetchOptionTop(q, top);
    if (skip   != null) this.applyFetchOptionSkip(q, skip);
  }

  protected applyFetchOptionFields(q: SelectQueryBuilder<T>, fields: (keyof T)[]) {
    fields.forEach(field => q.addSelect(`it.${field}`));
  }

  protected applyFetchOptionFilters(q: SelectQueryBuilder<T>, filter: Filter<T> | Filter<T>[]) {
    const [c, p] = this.buildWhere(Array.isArray(filter) ? { op: "and", filters: filter } : filter);
    q.where(c as any, p);
  }

  protected applyFetchOptionSorters(q: SelectQueryBuilder<T>, sort: Sorter<T> | Sorter<T>[]) {
    (Array.isArray(sort) ? sort : [sort])
      .forEach(sort => q.addOrderBy(sort.field, sort.ascending ? "ASC" : "DESC"));
  }

  protected applyFetchOptionTop(q: SelectQueryBuilder<T>, top: number) {
    q.take(top);
  }

  protected applyFetchOptionSkip(q: SelectQueryBuilder<T>, skip: number) {
    q.skip(skip);
  }

  protected convertSingleFetchOptions(options?: SingleFetchOptions<T>): FindOneOptions<T> {
    const {fields: select} = {...options};
    return {select, ...this.extraOptions.findOne};
  }

  protected buildAndBracket(filters: Filter<T>[]): Brackets {
    return new Brackets(q => filters
      .map(this.buildWhere.bind(this))
      .forEach(([condition, params]) => q.andWhere(condition as any, params))
    );
  }

  protected buildOrBracket(filters: Filter<T>[]): Brackets {
    return new Brackets(q => filters
      .map(this.buildWhere.bind(this))
      .forEach(([condition, params]) => q.orWhere(condition as any, params))
    );
  }

  protected buildInBracket(filter: SetFilter<T>): Brackets {
    const cond = `it.${filter.field} = :item`;
    return new Brackets(q => filter.items
      .forEach(item => q.orWhere(cond, {item}))
    );
  }

  protected buildNotInBracket(filter: SetFilter<T>): Brackets {
    const cond = `it.${filter.field} != :item`;
    return new Brackets(q => filter.items
      .forEach(item => q.andWhere(cond, {item}))
    );
  }

  protected buildWhere(filter: Filter<T>): [string | Brackets, any?] {
    switch (filter.op) {
      case "and":             return [this.buildAndBracket(filter.filters)];
      case "or":              return [this.buildOrBracket(filter.filters)];
      case "not":             return this.buildWhere(Filters.negate(filter.filter));

      case "in":              return [this.buildInBracket(filter)];
      case "not-in":          return [this.buildNotInBracket(filter)];

      case "null":            return [`it.${filter.field} = :null`, {null: null}];
      case "not-null":        return [`it.${filter.field} != :null`, {null: null}];

      case "equals":          return [`it.${filter.field} = :value`, {value: filter.value}];
      case "not-equal":       return [`it.${filter.field} != :value`, {value: filter.value}];

      case "greater":         return [`it.${filter.field} > :value`, {value: filter.value}];
      case "greater-equals":  return [`it.${filter.field} >= :value`, {value: filter.value}];

      case "less":            return [`it.${filter.field} < :value`, {value: filter.value}];
      case "less-equals":     return [`it.${filter.field} <= :value`, {value: filter.value}];

      case "contains":        return [`it.${filter.field} like :value`, {value: `%${filter.value}%`}];
      case "not-contains":    return [`it.${filter.field} not like :value`, {value: `%${filter.value}%`}];
      case "starts-with":     return [`it.${filter.field} like :value`, {value: `${filter.value}%`}];
      case "not-starts-with": return [`it.${filter.field} not like :value`, {value: `${filter.value}%`}];
      case "ends-with":       return [`it.${filter.field} like :value`, {value: `%${filter.value}`}];
      case "not-ends-with":   return [`it.${filter.field} not like :value`, {value: `%${filter.value}`}];

      default: throw new UnsupportedOperation(`${filter.op} operator not supported`);
    }
  }
}
