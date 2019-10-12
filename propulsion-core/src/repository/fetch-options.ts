import {Filter} from "@/types/document/filter";
import {Sorter} from "@/types/document/sorter";

export interface FetchOptions<T = any> {
  filter?: Filter<T>[] | Filter<T>;
  sort?: Sorter<T>[] | Sorter<T>;
  top?: number;
  skip?: number;
  fields?: (keyof T)[];
}

export interface SingleFetchOptions<T> {
  fields?: (keyof T)[];
}
