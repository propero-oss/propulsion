export type ComparisonOperator = "gt" | "lt" | "ge" | "le" | "eq" | "ne";

export interface ComparisonFilter<T = any, F = any> {
  op: ComparisonOperator;
  field: F;
  value: F extends keyof T ? T[F] : any;
}
