import { ComparisonFilter } from "@/filter/types";
import { and } from "@/filter/helper/logical-filter";

export function gt<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "gt", field, value };
}
export function lt<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "lt", field, value };
}

export function ge<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "ge", field, value };
}
export function le<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "le", field, value };
}

export function eq<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "eq", field, value };
}
export function ne<T, K>(field: K, value: K extends keyof T ? T[K] : any): ComparisonFilter<T, K> {
  return { op: "ne", field, value };
}

export function bt<T, K>(field: K, lower: K extends keyof T ? T[K] : any, upper: K extends keyof T ? T[K] : any) {
  return and(ge(field, lower), lt(field, upper));
}
