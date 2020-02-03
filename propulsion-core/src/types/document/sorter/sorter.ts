export type Sorter<T = any, F extends keyof T = any> = {
  field: F;
  ascending: boolean;
  nullsFirst?: boolean;
};
