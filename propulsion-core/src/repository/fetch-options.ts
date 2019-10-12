import {Filter, Sorter, ExcludeKeys, Simple, Single} from "@/types";

export type RelationOption<T> = {
  fields?: (keyof T)[];
} | true;

export type RelationOptions<T> = {
  [K in ExcludeKeys<T, Simple>]?: RelationOption<Single<T[K]>>;
};

export interface FetchOptions<T = any> {
  filter?: Filter<T>[] | Filter<T>;
  sort?: Sorter<T>[] | Sorter<T>;
  top?: number;
  skip?: number;
  fields?: (keyof T)[];
  relations?: RelationOptions<T>;
}

export interface SingleFetchOptions<T> {
  fields?: (keyof T)[];
  relations?: RelationOptions<T>;
}
