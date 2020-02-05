export type ProximityOperator = "close-to" | "far-from";

export interface ProximityFilter<T, F> {
  op: ProximityOperator;
  field: F;
  origin: F extends keyof T ? T[F] : any;
  distance: number;
}
