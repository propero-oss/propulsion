export type FuzzyOperator = "nt" | "ff";

export interface FuzzyFilter<T, F extends keyof T> {
    op: FuzzyOperator;
    field: F;
    origin: T[F];
    distance: any;
}