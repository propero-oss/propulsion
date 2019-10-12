
export type ExcludeKeys<T, U> = { [P in keyof T]: T[P] extends U ? never : P }[keyof T];
