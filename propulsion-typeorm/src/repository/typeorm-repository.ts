import {
  Document,
  DocumentMeta,
  FetchOptions, Filter,
  NoArgsConstructor,
  NoSuchElement,
  RepositoryBase,
  SingleFetchOptions, UnsupportedOperation
} from "@propero/propulsion-core";
import {Connection, Repository} from "typeorm";
import {FindManyOptions, FindOneOptions} from "typeorm/browser";

export type TypeormExtraOptions<T> = {
  findOne?: FindOneOptions<T>;
  findMany?: FindManyOptions<T>;
}

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


  public async findAll(options?: FetchOptions<T>): Promise<T[]> {
    // TODO: Fetch Options
    return await this.repo.find();
  }

  public async findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T> {
    const result = await this.repo.findOne(id, options && this.convertSingleFetchOptions(options));
    if (!result)
      throw new NoSuchElement();
    return result;
  }

  public async count(options?: FetchOptions<T>): Promise<number> {
    return this.repo.count(this.convertFetchOptions(options));
  }

  public async createOne(entity: Partial<T>): Promise<T> {
    const instance = Document.create(this.cls, entity);
    return await this.repo.save(instance);
  }

  public async updateOne(entity: Partial<T>, partialUpdate: boolean): Promise<T> {
    const update = Document.create(this.cls, entity);
    const original = await this.findOne(entity[this.id] as ID);

    if (partialUpdate)
      return await this.repo.save(this.repo.merge(original, update));

    update[this.id] = original[this.id];
    return await this.repo.save(update);
  }

  public async deleteOne(id: ID): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }

  protected convertSingleFetchOptions(options?: SingleFetchOptions<T>): FindOneOptions<T> {
    const {fields: select} = {...options};
    return {select, ...this.extraOptions.findOne};
  }

  protected convertFetchOptions(options?: FetchOptions<T>): FindManyOptions<T> {
    let {top: take, skip, fields: select, filter: where} = {...options};
    if (where)
      where = this.convertFilters(Array.isArray(where) ? { op: "and", filters: where}: where);
    return {take, skip, select, where, ...this.extraOptions.findMany};
  }

  protected convertFilters(filter: Filter<T>): any {
    // TODO Use Querybuilder
    throw new UnsupportedOperation("filtering is not yet supported");
  }

}
