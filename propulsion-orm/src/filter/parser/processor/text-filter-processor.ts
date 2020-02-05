import { Filter, TextFilter, TextOperator } from "@/filter/types";
import {
  contains,
  endsWith,
  like,
  matches,
  notContains,
  notEndsWith,
  notLike,
  notMatches,
  notStartsWith,
  startsWith
} from "@/filter/helper";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function textFilterProcessor(
  alias: string,
  operator: TextOperator,
  helper: <T, F>(field: F, value: string, ci: boolean) => TextFilter<T, F>
): FilterProcessor<TextFilter<any, any>> {
  return {
    alias,
    operator,
    validateParams(...params): boolean {
      return params.length > 1 && params.length < 4 && !params.find(it => typeof it !== "string");
    },
    process(next: (raw: UnprocessedFilter) => Filter, ...params): TextFilter<any, any> {
      const [field, value, ci] = params as string[];
      return helper(field, value, ci === "ci");
    },
    serializeParams(next: (filter: Filter) => string, filter: TextFilter<any, any>): string[] {
      const { field, value, ci } = filter;
      if (ci) return [field, value, "ci"];
      return [field, value];
    }
  };
}

export const containsProcessor = textFilterProcessor("contains", "contains", contains);
export const notContainsProcessor = textFilterProcessor("notContains", "not-contains", notContains);
export const matchProcessor = textFilterProcessor("matches", "match", matches);
export const notMatchProcessor = textFilterProcessor("notMatches", "not-match", notMatches);
export const likeProcessor = textFilterProcessor("like", "like", like);
export const notLikeProcessor = textFilterProcessor("notLike", "not-like", notLike);
export const startsWithProcessor = textFilterProcessor("startsWith", "starts-with", startsWith);
export const notStartsWithProcessor = textFilterProcessor("notStartsWith", "not-starts-with", notStartsWith);
export const endsWithProcessor = textFilterProcessor("endsWith", "ends-with", endsWith);
export const notEndsWithProcessor = textFilterProcessor("notEndsWith", "not-ends-with", notEndsWith);
