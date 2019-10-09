export type TextOperator = "ct" | "nc" | "rx" | "ri" | "mt" | "sw" | "ew";


export interface TextFilter<T, F extends keyof T> {
    op: TextOperator;
    field: F;
    value: T[F];
}
