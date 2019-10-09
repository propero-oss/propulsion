export type LogicalOperator = "and" | "or" | "not";


export type LogicalFilter = {
    op: "not";
    filter: Filter;
} | {
    op: "and" | "or";
    filters: Filter[];
}