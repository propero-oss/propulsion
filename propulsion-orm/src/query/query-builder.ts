import { SelectQueryBuilder } from "@/query/select-query-builder";

export interface QueryBuilder<T> {
  select(): SelectQueryBuilder<T>;
}
