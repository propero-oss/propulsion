import { Filter, ProximityFilter, ProximityOperator } from "@/filter/types";
import { closeTo, farFrom } from "@/filter/helper";
import { FilterProcessor, UnprocessedFilter } from "@/filter/parser/filter-parser-types";

export function proximityFilterProcessor(
  alias: string,
  operator: ProximityOperator,
  helper: <T, F>(field: F, origin: F extends keyof T ? T[F] : any, distance: number) => ProximityFilter<T, F>
): FilterProcessor<ProximityFilter<any, any>> {
  return {
    alias,
    operator,
    validateParams(...params): boolean {
      return params.length >= 2 && params.length <= 3 && !!params.find(it => typeof it !== "string");
    },
    process(next: (raw: UnprocessedFilter) => Filter, ...params): ProximityFilter<any, any> {
      return helper(params[0] as string, params[1] as string, +params[2] || 0);
    },
    serializeParams(next: (filter: Filter) => string, filter: ProximityFilter<any, any>): string[] {
      return [filter.field, filter.origin, filter.distance.toString()];
    }
  };
}

export const closeToProcessor = proximityFilterProcessor("closeTo", "close-to", closeTo);
export const farFromProcessor = proximityFilterProcessor("farFrom", "far-from", farFrom);
