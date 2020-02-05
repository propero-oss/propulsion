export interface Sorter<T = any> {
  field: keyof T | string;
  ascending: boolean;
}
