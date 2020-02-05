import { Filter, LogicalNotFilter, LogicalOperator, LogicalSetFilter, not } from "@/filter";
import { and, or } from "@/filter/helper/logical-filter";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function logicalSetFilterProcessor(
  alias: string,
  operator: LogicalOperator,
  helper: (filters: Filter[]) => LogicalSetFilter
): FilterProcessor<LogicalSetFilter> {
  return {
    operator,
    alias,
    validateParams(...params): boolean {
      return !!params.find(it => typeof it === "string");
    },
    process(next: (raw: UnprocessedFilter) => Filter, ...params): LogicalSetFilter {
      return helper((params as UnprocessedFilter[]).map(next));
    },
    serializeParams(next: (filter: Filter) => string, filter: LogicalSetFilter): string[] {
      return filter.filters.map(next);
    }
  };
}

export const andProcessor = logicalSetFilterProcessor("and", "and", and);
export const orProcessor = logicalSetFilterProcessor("or", "or", or);
export const notProcessor: FilterProcessor<LogicalNotFilter> = {
  operator: "not",
  alias: "not",
  validateParams(...params: (string | UnprocessedFilter)[]): boolean {
    return params.length === 1 && typeof params[0] !== "string";
  },
  process(next: (raw: UnprocessedFilter) => Filter, ...params: (string | UnprocessedFilter)[]): LogicalNotFilter {
    return not(next(params[0] as UnprocessedFilter));
  },
  serializeParams(next: (filter: Filter) => string, filter: LogicalNotFilter): string[] {
    return [next(filter.filter)];
  }
};
