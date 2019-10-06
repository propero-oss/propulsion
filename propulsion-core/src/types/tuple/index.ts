import {TuplePushType, TupleShiftType, TuplePopType, TupleUnshiftType, TupleType} from "@/types/tuple/_generated";
export * from "@/types/tuple/_generated";


/**
 * Forces Array Types into Tuples
 * Only works for first 10 elements
 */
export type Tuple<TUPLE extends [...any[]]> =
  ((...r: TupleType<TUPLE>) => void) extends (...a: infer R) => any
    ? R : never;

/**
 * Forces Array Types into Tuples and adds ELEMENT to the end
 * Only works for first 10 elements
 */
export type TuplePush<TUPLE extends [...any[]], ELEMENT> =
  ((...r: TuplePushType<TUPLE, ELEMENT>) => void) extends (...a: infer R) => any
    ? R : never

/**
 * Forces Array Types into Tuples and adds ELEMENT to the end
 * Only works for first 10 elements
 */
export type TuplePop<TUPLE extends [...any[]]> =
  ((...r: TuplePopType<TUPLE>) => void) extends (...a: infer R) => any
    ? R : never

/**
 * Forces Array Types into Tuples and adds ELEMENT to the front
 * Only works for first 10 elements
 */
export type TupleUnshift<TUPLE extends [...any[]], ELEMENT> =
  ((...r: TupleUnshiftType<TUPLE, ELEMENT>) => void) extends (...a: infer R) => any
    ? R : never

/**
 * Forces Array Types into Tuples and removes the first element
 * Only works for first 10 elements
 */
export type TupleShift<TUPLE extends [...any[]]> =
  ((...r: TupleShiftType<TUPLE>) => void) extends (...a: infer R) => any
    ? R : never
