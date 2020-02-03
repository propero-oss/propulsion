export type SetOperator = "in" | "not-in";

export interface SetFilter<T, F extends keyof T = any> {
  op: SetOperator;
  items: T[F][];
  field: F;
}

export type SetValueOperator = "null" | "not-null";

export interface SetValueFilter<T, F extends keyof T = any> {
  op: SetValueOperator;
  field: F;
}
