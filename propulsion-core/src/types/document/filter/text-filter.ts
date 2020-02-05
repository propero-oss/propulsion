export type TextOperator = "contains" | "not-contains" | "match" | "not-match" | "starts-with" | "ends-with" | "not-starts-with" | "not-ends-with";

export interface TextFilter<T, F extends keyof T = any> {
  op: TextOperator;
  field: F;
  value: T[F];
}
