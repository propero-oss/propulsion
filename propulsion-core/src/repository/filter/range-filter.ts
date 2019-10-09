export type RangeOperator = "gt" | "lt" | "ge" | "le" | "eq" | "ne";

export interface RangeFilter<T, F extends keyof T> {
    op: RangeOperator;
    field: F;
    value: T[F];
}

export type SetValueOperator = "nu" | "nn";

export interface SetValueFilter<T, F extends keyof T> {
    op: SetValueOperator;
    field: F;
}
