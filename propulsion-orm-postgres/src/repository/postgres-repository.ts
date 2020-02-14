import { PostgresConnection } from "@/connection/connection";
import { Repository, FetchOneOptions, FetchManyOptions } from "@propero/propulsion-orm";

export class PostgresRepository<T, ID> implements Repository<T, ID> {
  constructor(protected connection: PostgresConnection) {}

  public async fetchOne(options: FetchOneOptions<T, ID>): Promise<T>;
  public async fetchOne(id: ID): Promise<T>;
  public async fetchOne(opts: FetchOneOptions<T, ID> | ID): Promise<T> {
    if (typeof opts !== "object") opts = { id: opts };
    const { id, filter, fields, relations } = opts as FetchOneOptions<T, ID>;
    throw new Error("Method not implemented.");
  }

  public async fetchMany(opts: FetchManyOptions<T, ID>): Promise<T[]>;
  public async fetchMany(ids: ID[]): Promise<T[]>;
  public async fetchMany(ids: any): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  public async fetchManyAndCount(opts: FetchManyOptions<T, ID>): Promise<[T[], number]> {
    throw new Error("Method not implemented.");
  }

  public async count(opts: FetchManyOptions<T, ID>): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public async create(obj: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  public async update(id: ID, obj: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  public async merge(id: ID, obj: Partial<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: ID): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
