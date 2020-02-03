import { TuplePushHelperType, TuplePopHelperType } from "@/types/tuple/_generated";
export * from "@/types/tuple/single";

/**
 * Forces Array Types into Tuples
 */
export type Tuple<TUPLE extends [...any[]]> = ((...r: TUPLE) => void) extends (...a: infer R) => any ? R : never;

/**
 * Forces Array Types into Tuples and adds ELEMENT to the end
 * Only works for first 100 elements
 */
export type TuplePush<
  T extends any[],
  V,
  L = TuplePushHelperType[T["length"]],
  P = { [K in keyof L]: K extends keyof T ? T[K] : V }
> = P extends any[] ? P : never;

/**
 * Forces Array Types into Tuples and adds ELEMENT to the end
 * Only works for first 100 elements
 */
export type TuplePop<
  T extends any[],
  L = TuplePopHelperType[T["length"]],
  P = { [K in keyof L]: K extends keyof T ? T[K] : never }
> = P extends any[] ? P : never;

/**
 * Forces Array Types into Tuples and adds ELEMENT to the front
 */
export type TupleUnshift<TUPLE extends [...any[]], ELEMENT> = ((e: ELEMENT, ...r: TUPLE) => void) extends (...a: infer R) => any
  ? R
  : never;

/**
 * Forces Array Types into Tuples and removes the first element
 */
export type TupleShift<TUPLE extends [...any[]]> = ((...r: TUPLE) => void) extends (e: any, ...a: infer R) => any ? R : never;
