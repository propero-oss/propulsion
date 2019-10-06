export type TupleType<T> = T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8,infer T9]?[T0,T1,T2,T3,T4,T5,T6,T7,T8,T9]:T;
export type TuplePushType<T, E> = T extends []?[E]:T extends [infer T0]?[T0,E]:T extends [infer T0,infer T1]?[T0,T1,E]:T extends [infer T0,infer T1,infer T2]?[T0,T1,T2,E]:T extends [infer T0,infer T1,infer T2,infer T3]?[T0,T1,T2,T3,E]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4]?[T0,T1,T2,T3,T4,E]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5]?[T0,T1,T2,T3,T4,T5,E]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6]?[T0,T1,T2,T3,T4,T5,T6,E]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7]?[T0,T1,T2,T3,T4,T5,T6,T7,E]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8]?[T0,T1,T2,T3,T4,T5,T6,T7,T8,E]:T;
export type TuplePopType<T> = T extends [infer T0]?[]:T extends [infer T0,infer T1]?[T0]:T extends [infer T0,infer T1,infer T2]?[T0,T1]:T extends [infer T0,infer T1,infer T2,infer T3]?[T0,T1,T2]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4]?[T0,T1,T2,T3]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5]?[T0,T1,T2,T3,T4]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6]?[T0,T1,T2,T3,T4,T5]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7]?[T0,T1,T2,T3,T4,T5,T6]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8]?[T0,T1,T2,T3,T4,T5,T6,T7]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8,infer T9]?[T0,T1,T2,T3,T4,T5,T6,T7,T8]:T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8,infer T9,infer T10]?[T0,T1,T2,T3,T4,T5,T6,T7,T8,T9]:T;
export type TupleShiftType<T> = T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8,infer T9]?[T1,T2,T3,T4,T5,T6,T7,T8,T9]:T;
export type TupleUnshiftType<T, E> = T extends [infer T0,infer T1,infer T2,infer T3,infer T4,infer T5,infer T6,infer T7,infer T8,infer T9]?[E,T0,T1,T2,T3,T4,T5,T6,T7,T8,T9]:T;
