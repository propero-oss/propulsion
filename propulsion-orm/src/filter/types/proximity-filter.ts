export type ProximityOperator = "close-to" | "far-from";

export interface ProximityFilter<T = any, F = any> {
  op: ProximityOperator;
  field: F;
  origin: F extends keyof T ? T[F] : any;
  distance: number;
}
