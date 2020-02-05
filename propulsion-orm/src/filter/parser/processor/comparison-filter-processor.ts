import { ComparisonFilter, eq, Filter, ge, gt, le, lt, ne } from "@/filter";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function comparisonFilterProcessor(
  operator: string,
  builder: <T, K>(field: K, value: K extends keyof T ? T[K] : any) => ComparisonFilter<T, K>
): FilterProcessor<ComparisonFilter<any>> {
  return {
    process(next: (raw: UnprocessedFilter) => Filter, ...params: (string | UnprocessedFilter)[]): ComparisonFilter<any> {
      return builder(params[0], params[1]);
    },
    serializeParams(next: (filter: Filter) => string, filter: ComparisonFilter<any>): string[] {
      return [filter.field, filter.value];
    },
    validateParams(...params: (string | UnprocessedFilter)[]): boolean {
      return params.length === 2 && typeof params[0] === "string" && typeof params[1] === "string";
    },
    operator
  };
}

export const ltProcessor = comparisonFilterProcessor("lt", lt);
export const gtProcessor = comparisonFilterProcessor("gt", gt);
export const leProcessor = comparisonFilterProcessor("le", le);
export const geProcessor = comparisonFilterProcessor("ge", ge);
export const eqProcessor = comparisonFilterProcessor("eq", eq);
export const neProcessor = comparisonFilterProcessor("ne", ne);
