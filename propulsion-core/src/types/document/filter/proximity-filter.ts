export type ProximityOperator = "close-to" | "far-from";

export interface ProximityFilter<T, F extends keyof T = any> {
    op: ProximityOperator;
    field: F;
    origin: T[F];
    distance: number;
}
