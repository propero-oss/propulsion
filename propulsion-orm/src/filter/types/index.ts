import { RawFilter } from "@/filter";
import { TextFilter, TextOperator } from "@/filter/types/text-filter";
import { LogicalFilter, LogicalOperator } from "@/filter/types/logical-filter";
import { SetFilter, SetOperator, SetValueFilter, SetValueOperator } from "@/filter/types/set-filter";
import { ComparisonFilter, ComparisonOperator } from "@/filter/types/comparison-filter";
import { ProximityFilter, ProximityOperator } from "@/filter/types/proximity-filter";

export * from "@/filter/types/proximity-filter";
export * from "@/filter/types/logical-filter";
export * from "@/filter/types/comparison-filter";
export * from "@/filter/types/logical-filter";
export * from "@/filter/types/set-filter";
export * from "@/filter/types/text-filter";
export * from "@/filter/types/raw-filter";

export type FilterOperator = LogicalOperator | SetOperator | TextOperator | ComparisonOperator | ProximityOperator | SetValueOperator;
export type Filter<T = any, F extends keyof T = any> =
  | SetFilter<T, F>
  | LogicalFilter<T>
  | TextFilter<T, F>
  | ComparisonFilter<T, F>
  | ProximityFilter<T, F>
  | SetValueFilter<F>
  | RawFilter;
