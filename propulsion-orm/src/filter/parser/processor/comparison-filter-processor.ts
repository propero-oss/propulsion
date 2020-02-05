import { eq, ge, gt, le, lt, ne } from "@/filter/helper";
import { ComparisonFilter, ComparisonOperator, Filter } from "@/filter/types";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function comparisonFilterProcessor(
  alias: string,
  operator: ComparisonOperator,
  builder: <T, K>(field: K, value: K extends keyof T ? T[K] : any) => ComparisonFilter<T, K>
): FilterProcessor<ComparisonFilter<any>> {
  return {
    operator,
    alias,
    process(next: (raw: UnprocessedFilter) => Filter, ...params: (string | UnprocessedFilter)[]): ComparisonFilter<any> {
      return builder(params[0], params[1]);
    },
    serializeParams(next: (filter: Filter) => string, filter: ComparisonFilter<any>): string[] {
      return [filter.field, filter.value];
    },
    validateParams(...params: (string | UnprocessedFilter)[]): boolean {
      return params.length === 2 && typeof params[0] === "string" && typeof params[1] === "string";
    }
  };
}

export const ltProcessor = comparisonFilterProcessor("lt", "lt", lt);
export const gtProcessor = comparisonFilterProcessor("lt", "lt", gt);
export const leProcessor = comparisonFilterProcessor("lt", "lt", le);
export const geProcessor = comparisonFilterProcessor("lt", "lt", ge);
export const eqProcessor = comparisonFilterProcessor("lt", "lt", eq);
export const neProcessor = comparisonFilterProcessor("lt", "lt", ne);
