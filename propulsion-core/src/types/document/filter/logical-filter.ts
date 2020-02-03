import { Filter } from "@/types";

export type LogicalOperator = "and" | "or" | "not";

export type LogicalSetFilter = {
  op: "and" | "or";
  filters: Filter[];
};

export type LogicalNotFilter = {
  op: "not";
  filter: Filter;
};

export type LogicalFilter = LogicalNotFilter | LogicalSetFilter;
