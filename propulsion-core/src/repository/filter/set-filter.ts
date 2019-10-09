export type SetOperator = "in" | "ni";

export interface SetFilter<T, F extends keyof T> {
    op: SetOperator;
    items: T[F][];
    field: F;
}