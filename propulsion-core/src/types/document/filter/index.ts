import {TextFilter, TextOperator} from "@/types/document/filter/text-filter";
import {LogicalFilter, LogicalOperator} from "@/types/document/filter/logical-filter";
import {SetFilter, SetOperator, SetValueFilter, SetValueOperator} from "@/types/document/filter/set-filter";
import {ComparisonFilter, ComparisonOperator} from "@/types/document/filter/comparison-filter";
import {ProximityFilter, ProximityOperator} from "@/types/document/filter/proximity-filter";

export * from "@/types/document/filter/proximity-filter";
export * from "@/types/document/filter/logical-filter";
export * from "@/types/document/filter/comparison-filter";
export * from "@/types/document/filter/logical-filter";
export * from "@/types/document/filter/set-filter";
export * from "@/types/document/filter/text-filter";

export type FilterOperator = LogicalOperator | SetOperator | TextOperator | ComparisonOperator | ProximityOperator | SetValueOperator;
export type Filter<T = any, F extends keyof T = any>
    = SetFilter<T, F> | LogicalFilter | TextFilter<T, F> | ComparisonFilter<T, F> | ProximityFilter<T, F> | SetValueFilter<T, F>;
