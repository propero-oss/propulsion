export type RangeOperator = "gt" | "lt" | "ge" | "le" | "eq" | "ne" | "nu" | "nn";

export interface RangeFilter<T, F extends keyof T> {
    op: RangeOperator;
    field: F;
    value: T[F];
}