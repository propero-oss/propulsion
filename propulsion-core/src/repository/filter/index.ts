import {TextFilter, TextOperator} from "@/repository/filter/text-filter";
import {LogicalFilter, LogicalOperator} from "@/repository/filter/logical-filter";
import {SetFilter, SetOperator} from "@/repository/filter/set-filter";
import {RangeFilter, RangeOperator, SetValueFilter, SetValueOperator} from "@/repository/filter/range-filter";
import {FuzzyFilter, FuzzyOperator} from "@/repository/filter/fuzzy-filter";

export * from "@/repository/filter/fuzzy-filter";
export * from "@/repository/filter/logical-filter";
export * from "@/repository/filter/range-filter";
export * from "@/repository/filter/logical-filter";
export * from "@/repository/filter/set-filter";
export * from "@/repository/filter/text-filter";

export type FilterOperator = LogicalOperator | SetOperator | TextOperator | RangeOperator | FuzzyOperator | SetValueOperator;
export type Filter<T = any, F extends keyof T = any>
    = SetFilter<T, F> | LogicalFilter | TextFilter<T, F> | RangeFilter<T, F> | FuzzyFilter<T, F> | SetValueFilter<T, F>;
