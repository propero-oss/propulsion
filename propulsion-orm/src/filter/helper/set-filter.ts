import { SetFilter, SetValueFilter } from "@/filter/types";

export function inValues<T, F>(field: F, items: (F extends keyof T ? T[F] : any)[]): SetFilter<T, F> {
  return { op: "in", field, items };
}

export function notInValues<T, F>(field: F, items: (F extends keyof T ? T[F] : any)[]): SetFilter<T, F> {
  return { op: "not-in", field, items };
}

export function isNull<F>(field: F): SetValueFilter<F> {
  return { op: "null", field };
}

export function notNull<F>(field: F): SetValueFilter<F> {
  return { op: "not-null", field };
}
