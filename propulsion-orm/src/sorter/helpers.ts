import { Sorter } from "@/sorter/types";

export function asc(field: string): Sorter {
  return { field, ascending: true };
}

export function desc(field: string): Sorter {
  return { field, ascending: false };
}
