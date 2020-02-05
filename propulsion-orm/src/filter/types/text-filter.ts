export type TextOperator =
  | "contains"
  | "not-contains"
  | "match"
  | "not-match"
  | "like"
  | "not-like"
  | "starts-with"
  | "not-starts-with"
  | "ends-with"
  | "not-ends-with";

export interface TextFilter<T, F> {
  op: TextOperator;
  field: F;
  value: string;
  ci: boolean;
}
