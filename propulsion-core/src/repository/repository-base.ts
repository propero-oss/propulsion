import {Document} from "@/document";
import {FetchOptions, Repository, SingleFetchOptions} from "@/repository";
import {NoArgsConstructor} from "@/types";

export abstract class RepositoryBase<T, F extends keyof T, ID extends T[F]> implements Repository<T, F, ID> {

  protected constructor(
    protected cls: NoArgsConstructor<T>,
    protected id: F,
  ) {}

  public abstract count(options?: FetchOptions<T>): Promise<number>;
  public abstract findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T>;
  public abstract findAll(options?: FetchOptions<T>): Promise<T[]>;

  public abstract createOne(entity: Partial<T>): Promise<T>;
  public abstract updateOne(entity: Partial<T>, partialUpdate: boolean): Promise<T>;
  public abstract deleteOne(id: ID): Promise<void>;


  public async findMany(ids: ID[], options?: SingleFetchOptions<T>): Promise<T[]> {
    return Promise.all(ids.map(id => this.findOne(id, options)));
  }

  public async findAllAndCount(options?: FetchOptions<T>): Promise<{count: number, data: T[]}> {
    const count = await this.count(this.fetchToCountOptions(options));
    const data = await this.findAll(options);
    return {data, count};
  }

  public async createMany(entities: Partial<T>[]): Promise<T[]> {
    return Promise.all(entities.map(one => this.createOne(one)));
  }

  public async updateMany(entities: Partial<T>[], partialUpdate: boolean): Promise<T[]> {
    return Promise.all(entities.map(one => this.updateOne(one, partialUpdate)));
  }

  public async deleteMany(ids: ID[]): Promise<void> {
    return Promise.all(ids.map(id => this.deleteOne(id))).then(() => undefined);
  }


  public describe() { return Document.getMeta(this.cls); }
  public type() { return this.cls; }


  protected fetchToCountOptions(options?: FetchOptions<T>): FetchOptions<T> {
    const opts: FetchOptions<T> = {...options};
    delete opts.top;
    delete opts.skip;
    opts.fields = [this.id];
    return opts;
  }
}
