import { PostgresQueryBuilder } from "@/query/builder";
import { PostgresRepository } from "@/repository/postgres-repository";
import { Constructor } from "@propero/propulsion-core";
import { Connection, ConnectionOptions, QueryBuilder, Repository, Transaction } from "@propero/propulsion-orm";
import { Pool, PoolConfig } from "pg";

declare module "@propero/propulsion-orm" {
  export interface ConnectionOptions extends PoolConfig {
    driver: "postgres" | string;
  }
}

export class PostgresConnection implements Connection {
  public pool?: Pool;
  constructor(protected options: ConnectionOptions) {}

  public async open(): Promise<void> {
    const pool = (this.pool = new Pool(this.options));
  }

  public async close(): Promise<void> {
    await this.pool?.end();
    this.pool = undefined;
  }

  public getQueryBuilder<T = any>(cls?: Constructor<T>): QueryBuilder<T> {
    return new PostgresQueryBuilder(this);
  }

  public getRepository<T>(cls: Constructor<T>): Repository<T, any> {
    return new PostgresRepository(this);
  }

  public async query(query: string, ...replacements: any[]): Promise<any> {
    return undefined;
  }

  public async withTransaction(scope: (transaction: Transaction) => Promise<any>): Promise<void> {
    return undefined;
  }
}
