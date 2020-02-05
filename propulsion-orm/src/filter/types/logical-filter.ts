import { Filter } from "@/filter";

export type LogicalOperator = "and" | "or" | "not";

export interface LogicalSetFilter<T = any> {
  op: "and" | "or";
  filters: Filter<T>[];
}

export interface LogicalNotFilter<T = any> {
  op: "not";
  filter: Filter<T>;
}

export type LogicalFilter<T = any> = LogicalNotFilter<T> | LogicalSetFilter<T>;
