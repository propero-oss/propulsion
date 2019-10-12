import {
  ComparisonFilter, ComparisonOperator,
  Filter,
  FilterOperator,
  LogicalNotFilter,
  LogicalSetFilter, ProximityFilter, ProximityOperator,
  SetFilter, SetOperator,
  SetValueFilter, SetValueOperator,
  TextFilter,
  TextOperator
} from "@/types";

const textFilterMapper       = (op: TextOperator) => <T>(filter: TextFilter<T>) =>
  ({ op, field: filter.field, value: filter.value });
const setFilterMapper        = (op: SetOperator) => <T>(filter: SetFilter<T>) =>
  ({ op, field: filter.field, items: filter.items });
const comparisonFilterMapper = (op: ComparisonOperator) => <T>(filter: ComparisonFilter<T>) =>
  ({ op, field: filter.field, value: filter.value });
const setValueFilterMapper   = (op: SetValueOperator) => <T>(filter: SetValueFilter<T>) =>
  ({ op, field: filter.field });
const proximityFilterMapper  = (op: ProximityOperator) => <T>(filter: ProximityFilter<T>) =>
  ({ op, field: filter.field, origin: filter.origin, distance: filter.distance });

const negations: Record<FilterOperator | string, any> = {
  "and": (filter: LogicalSetFilter) => ({ op: "or",  filters: filter.filters.map(Filters.negate) }),
  "or":  (filter: LogicalSetFilter) => ({ op: "and", filters: filter.filters.map(Filters.negate) }),
  "not": (filter: LogicalNotFilter) => filter.filter,

  "in":               setFilterMapper("not-in"),
  "not-in":           setFilterMapper("in"),

  "null":             setValueFilterMapper("not-null"),
  "not-null":         setValueFilterMapper("null"),

  "equals":           comparisonFilterMapper("not-equal"),
  "not-equal":        comparisonFilterMapper("equals"),

  "greater":          comparisonFilterMapper("less-equals"),
  "greater-equals":   comparisonFilterMapper("less"),

  "less":             comparisonFilterMapper("greater-equals"),
  "less-equals":      comparisonFilterMapper("greater"),

  "contains":         textFilterMapper("not-contains"),
  "not-contains":     textFilterMapper("contains"),

  "starts-with":      textFilterMapper("not-starts-with"),
  "not-starts-with":  textFilterMapper("starts-with"),

  "ends-with":        textFilterMapper("not-ends-with"),
  "not-ends-with":    textFilterMapper("ends-with"),

  "match":            textFilterMapper("not-match"),
  "not-match":        textFilterMapper("match"),

  "close-to":         proximityFilterMapper("far-from"),
  "far-from":         proximityFilterMapper("close-to"),
};

export function Filters() {}

Filters.negations = negations;

Filters.negate = function<T, F extends keyof T = any>(filter: Filter<T, F>): Filter<T, F> {
  return Filters.negations[filter.op](filter);
};

Filters.checkSupport = function<T = any, F extends keyof T = any>(filter: Filter<T, F>, supported: FilterOperator[]): boolean {
  if (!supported.includes(filter.op))
    return false;
  if (filter.op === "and" || filter.op === "or")
    return filter.filters.every(filter => Filters.checkSupport(filter, supported));
  if (filter.op === "not")
    return Filters.checkSupport(filter.filter, supported);
  return true;
};
