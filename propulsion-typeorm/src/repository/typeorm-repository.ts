import {
  Document,
  DocumentMeta,
  FetchOptions, Filter,
  NoArgsConstructor,
  NoSuchElement,
  Repository,
  SingleFetchOptions, UnsupportedOperation
} from "@propero/propulsion-core";
import {Connection, Repository as CustomRepository} from "typeorm";
import {FindManyOptions, FindOneOptions} from "typeorm/browser";

export type TypeormExtraOptions<T> = {
  findOne?: FindOneOptions<T>;
  findMany?: FindManyOptions<T>;
}

export class TypeormRepository<T, F extends keyof T, ID extends T[F]> implements Repository<T, F, ID> {

  constructor(
    private connection: () => Connection,
    private cls: NoArgsConstructor<T>,
    private idField: F,
    private customRepository?: () => CustomRepository<T>,
    private extraOptions: TypeormExtraOptions<T> = {}
  ) {}

  private get repo() {
    if (this.customRepository)
      return this.customRepository();
    return this.connection().getRepository(this.cls);
  }

  public type(): NoArgsConstructor<T> { return this.cls; }
  public describe(): DocumentMeta<NoArgsConstructor<T>> { return Document.getMeta(this.cls); }


  public async findAll(options?: FetchOptions<T>): Promise<T[]> {
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

  public async create(entity: Partial<T>): Promise<T> {
    const instance = Document.create(this.cls, entity);
    return await this.repo.save(instance);
  }

  public async update(id: ID, entity: Partial<T>, partialUpdate: boolean): Promise<T> {
    const update = Document.create(this.cls, entity);
    const original = await this.findOne(id);

    if (partialUpdate)
      return await this.repo.save(this.repo.merge(original, update));

    update[this.idField as keyof T] = original[this.idField as keyof T];
    return await this.repo.save(update);
  }

  public async delete(id: ID): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }

  private convertSingleFetchOptions(options?: SingleFetchOptions<T>): FindOneOptions<T> {
    const {fields: select} = {...options};
    return {select, ...this.extraOptions.findOne};
  }

  private convertFetchOptions(options?: FetchOptions<T>): FindManyOptions<T> {
    let {top: take, skip, fields: select, filter: where} = {...options};
    if (where)
      where = this.convertFilters(Array.isArray(where) ? { op: "and", filters: where}: where);
    return {take, skip, select, where, ...this.extraOptions.findMany};
  }

  private convertFilters(filter: Filter<T>): any {
    // TODO Use Querybuilder
    throw new UnsupportedOperation("filtering is not yet supported");
  }

}
