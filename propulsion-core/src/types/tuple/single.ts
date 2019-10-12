
export type Single<T> = T extends any[] ? T[number] : T;
