import { Filter, FilterOperator } from "@/filter";

export const TOKEN_PARAMS_START = Symbol("TOKEN_PARAMS_START");
export const TOKEN_PARAMS_END = Symbol("TOKEN_PARAMS_END");
export const TOKEN_PARAMS_SEPARATOR = Symbol("TOKEN_PARAMS_SEPARATOR");

export type FilterParserToken = typeof TOKEN_PARAMS_START | typeof TOKEN_PARAMS_END | typeof TOKEN_PARAMS_SEPARATOR;
export interface UnprocessedFilter {
  op: string;
  params: (string | UnprocessedFilter)[];
}

export interface FilterProcessor<T extends Filter = any> {
  operator: FilterOperator;
  alias: string;
  validateParams(...params: (string | UnprocessedFilter)[]): boolean;
  process(next: (raw: UnprocessedFilter) => Filter, ...params: (string | UnprocessedFilter)[]): T;
  serializeParams(next: (filter: Filter) => string, filter: T): string[];
}
