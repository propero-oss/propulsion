import { ProximityFilter } from "@/filter/types";
import { and } from "@/filter/helper/logical-filter";

export function closeTo<T, F>(field: F, origin: F extends keyof T ? T[F] : any, distance = 0): ProximityFilter<T, F> {
  return { op: "close-to", field, origin, distance };
}

export function farFrom<T, F>(field: F, origin: F extends keyof T ? T[F] : any, distance = 0): ProximityFilter<T, F> {
  return { op: "far-from", field, origin, distance };
}

export function within<T, F>(field: F, origin: F extends keyof T ? T[F] : any, min = 0, max = 0) {
  return and(farFrom(field, origin, min), closeTo(field, origin, max));
}
