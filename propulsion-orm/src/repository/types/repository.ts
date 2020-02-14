import { FetchManyOptions, FetchOneOptions } from "@/repository/types/fetch-options";

export interface Repository<T, ID> {
  fetchOne(options: FetchOneOptions<T, ID>): Promise<T>;
  fetchOne(id: ID): Promise<T>;
  fetchMany(opts: FetchManyOptions<T, ID>): Promise<T[]>;
  fetchMany(ids: ID[]): Promise<T[]>;
  fetchManyAndCount(opts: FetchManyOptions<T, ID>): Promise<[T[], number]>;
  count(opts: FetchManyOptions<T, ID>): Promise<number>;
  create(obj: T): Promise<T>;
  update(id: ID, obj: T): Promise<T>;
  merge(id: ID, obj: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}
