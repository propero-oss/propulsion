import { Filter } from "@/filter";
import { Sorter } from "@/sorter";

export interface FetchOptions<T> {
  filter?: Filter<T>;
  relations?: string[];
  fields?: string[];
}

export interface FetchManyOptions<T, ID> extends FetchOptions<T> {
  sorter?: Sorter[];
  top?: number;
  skip?: number;
  ids?: ID[];
}

export interface FetchOneOptions<T, ID> extends FetchOptions<T> {
  id?: ID;
}
