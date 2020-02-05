import { TextFilter } from "@/filter/types";

export function contains<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "contains", field, value, ci };
}
export function notContains<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "not-contains", field, value, ci };
}

export function matches<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "match", field, value, ci };
}
export function notMatches<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "not-match", field, value, ci };
}

export function like<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "like", field, value, ci };
}
export function notLike<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "not-like", field, value, ci };
}

export function startsWith<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "starts-with", field, value, ci };
}
export function notStartsWith<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "not-starts-with", field, value, ci };
}

export function endsWith<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "ends-with", field, value, ci };
}
export function notEndsWith<T, F>(field: F, value: string, ci = false): TextFilter<T, F> {
  return { op: "not-ends-with", field, value, ci };
}
