import {
  contains,
  endsWith,
  Filter,
  like,
  matches,
  notContains,
  notEndsWith,
  notLike,
  notMatches,
  notStartsWith,
  startsWith,
  TextFilter
} from "@/filter";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function textFilterProcessor(
  operator: string,
  helper: <T, F>(field: F, value: string, ci: boolean) => TextFilter<T, F>
): FilterProcessor<TextFilter<any, any>> {
  return {
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

export const containsProcessor = textFilterProcessor("contains", contains);
export const notContainsProcessor = textFilterProcessor("notContains", notContains);
export const matchProcessor = textFilterProcessor("matches", matches);
export const notMatchProcessor = textFilterProcessor("notMatches", notMatches);
export const likeProcessor = textFilterProcessor("like", like);
export const notLikeProcessor = textFilterProcessor("notLike", notLike);
export const startsWithProcessor = textFilterProcessor("startsWith", startsWith);
export const notStartsWithProcessor = textFilterProcessor("notStartsWith", notStartsWith);
export const endsWithProcessor = textFilterProcessor("endsWith", endsWith);
export const notEndsWithProcessor = textFilterProcessor("notEndsWith", notEndsWith);
