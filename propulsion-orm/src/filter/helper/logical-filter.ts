import { Filter, LogicalNotFilter, LogicalSetFilter } from "@/filter/types";

export function and(...filters: Filter[]): LogicalSetFilter;
export function and(filters: Filter[]): LogicalSetFilter;
export function and(...filterOrFilters: Filter[] | [Filter[]]): LogicalSetFilter {
  const filters = filterOrFilters.length > 0 ? (Array.isArray(filterOrFilters[0]) ? filterOrFilters[0] : (filterOrFilters as Filter[])) : [];
  return { op: "and", filters };
}

export function or(...filters: Filter[]): LogicalSetFilter;
export function or(filters: Filter[]): LogicalSetFilter;
export function or(...filterOrFilters: Filter[] | [Filter[]]): LogicalSetFilter {
  const filters = filterOrFilters.length > 0 ? (Array.isArray(filterOrFilters[0]) ? filterOrFilters[0] : (filterOrFilters as Filter[])) : [];
  return { op: "or", filters };
}

export function not(filter: Filter): LogicalNotFilter {
  return { op: "not", filter };
}
