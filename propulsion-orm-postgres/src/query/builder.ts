import { PostgresConnection } from "@/connection/connection";
import { PostgresSelectQueryBuilder } from "@/query/select-builder";
import { QueryBuilder, SelectQueryBuilder } from "@propero/propulsion-orm";

export class PostgresQueryBuilder<T> implements QueryBuilder<T> {
  constructor(protected connection: PostgresConnection) {}

  public select(): SelectQueryBuilder<T> {
    return new PostgresSelectQueryBuilder(this.connection);
    return undefined as any;
  }
}
