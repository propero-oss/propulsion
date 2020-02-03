export type TFunction<RETURN = any, ARGS extends unknown[] = any, THIS = any> = (this: THIS, ...args: ARGS) => RETURN;
export type NamedFunction<RETURN = any, ARGS extends unknown[] = any, THIS = any> = TFunction<RETURN, ARGS, THIS> & { name: string };
export type NoArgsFunction<RETURN = any> = TFunction<RETURN, []>;
export type SingleArgFunction<RETURN = any, ARG = any> = TFunction<RETURN, [ARG]>;
