
export type Constructor<T = any, ARGS extends unknown[] = any[]> = { new(...args: ARGS): T };
export type NoArgsConstructor<T = any> = Constructor<T, []>;
export type SingleArgConstructor<T = any, ARG = any> = Constructor<T, [ARG]>;
