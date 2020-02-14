import { Filter } from "@/filter";
import { Sorter } from "@/sorter";

export interface SelectQueryBuilder<T> {
  fields(fields: string[]): this;
  relations(relations: string[]): this;
  where(filter: Filter): this;
  top(top: number): this;
  skip(skip: number): this;
  sort(sort: Sorter<T>[]): this;

  one(): Promise<T>;
  many(): Promise<T[]>;
  count(): Promise<number>;
  manyAndCount(): Promise<[T[], number]>;
}
