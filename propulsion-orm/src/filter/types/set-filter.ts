export type SetOperator = "in" | "not-in";

export interface SetFilter<T = any, F = any> {
  op: SetOperator;
  items: (F extends keyof T ? T[F] : any)[];
  field: F;
}

export type SetValueOperator = "null" | "not-null";

export interface SetValueFilter<F> {
  op: SetValueOperator;
  field: F;
}
