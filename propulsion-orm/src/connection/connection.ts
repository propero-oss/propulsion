import { QueryBuilder } from "@/query/query-builder";
import { SelectQueryBuilder } from "@/query/select-query-builder";
import { Repository } from "@/repository/types/repository";
import { Constructor } from "@propero/propulsion-core";

export interface Connection {
  getRepository<T>(cls: Constructor<T>): Repository<T, any>;
  getQueryBuilder<T = any>(cls?: Constructor<T>): QueryBuilder<T>;
  query(query: string, ...replacements: any[]): Promise<any>;
  close(): Promise<void>;
  open(): Promise<void>;
  withTransaction(scope: (transaction: Transaction) => Promise<any>): Promise<void>;
}

export interface Transaction {
  query(query: string, ...replacements: any[]): Promise<any>;
  select<T>(cls: Constructor<T>): SelectQueryBuilder<T>;
  cancel(): void;
}

export interface ConnectionOptions {
  driver: "none" | string;
  module?: string | { Connection: Constructor<Connection> };
}
