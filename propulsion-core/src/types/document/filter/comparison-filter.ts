export type ComparisonOperator = "greater" | "less" | "greater-equals" | "less-equals" | "equals" | "not-equal";

export interface ComparisonFilter<T, F extends keyof T = any> {
  op: ComparisonOperator;
  field: F;
  value: T[F];
}
