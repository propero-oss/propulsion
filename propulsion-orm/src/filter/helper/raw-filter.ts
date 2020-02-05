import { RawFilter } from "@/filter/types";

export function raw(query: string, replacements?: Record<string, any>): RawFilter {
  return { op: "raw", query, replacements };
}
