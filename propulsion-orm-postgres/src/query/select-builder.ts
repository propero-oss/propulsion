import { PostgresConnection } from "@/connection/connection";
import { Constructor } from "@propero/propulsion-core";
import {
  ComparisonFilter,
  Filter,
  LogicalNotFilter,
  LogicalSetFilter,
  RawFilter,
  SelectQueryBuilder,
  SetFilter,
  SetValueFilter,
  Sorter,
  TextFilter,
  UnsupportedOperation
} from "@propero/propulsion-orm";

export class PostgresSelectQueryBuilder<T> implements SelectQueryBuilder<T> {
  constructor(protected connection: PostgresConnection, protected entity: Constructor<T>) {}

  protected _fields?: string[];
  protected _relations?: string[];
  protected _top?: number;
  protected _skip?: number;
  protected _sort?: Sorter<T>[];
  protected _where?: Filter<T>;

  public fields(fields: string[]): this {
    this._fields = fields;
    return this;
  }

  public relations(relations: string[]): this {
    this._relations = relations;
    return this;
  }

  public skip(skip: number): this {
    this._skip = skip;
    return this;
  }

  public top(top: number): this {
    this._top = top;
    return this;
  }

  public sort(sort: Sorter<T>[]): this {
    this._sort = sort;
    return this;
  }

  public where(filter: Filter<T>): this {
    this._where = filter;
    return this;
  }

  public async count(): Promise<number> {
    const [query, replacements] = this.chain([this.buildSelectCountStatement, this.buildWhereStatement]);
    const count = await this.connection.pool?.query(query, replacements);
    return count!.rows[0].count;
  }

  public async many(): Promise<T[]> {
    const [query, replacements] = this.chain([
      this.buildSelectStatement,
      this.buildJoinStatement,
      this.buildOrderStatement,
      this.buildLimitStatement,
      this.buildWhereStatement
    ]);
    const result = await this.connection.pool?.query(query, replacements);
    return result!.rows as T[];
  }

  public manyAndCount(): Promise<[T[], number]> {
    throw new Error("Not yet implemented");
  }

  public one(): Promise<T> {
    throw new Error("Not yet implemented");
  }

  protected chain(methods: ((replacements: any[]) => string)[]): [string, any[]] {
    const replacements: any[] = [];
    let query = "";
    for (const method of methods) query += method.call(this, replacements);
    return [query, replacements];
  }

  protected buildJoinStatement(replacements: any[]): string {
    throw new Error("Not yet implemented");
  }

  protected buildOrderStatement(replacements: any[]): string {
    const { _sort: sort } = this;
    if (sort == null || sort.length === 0) return "";
    const order = sort
      .map(({ field, ascending }) => {
        replacements.push(field);
        return ascending ? `$${replacements.length}` : `$${replacements.length} desc`;
      })
      .join(", ");
    return ` order by ${order}`;
  }

  protected buildLimitStatement(replacements: any[]): string {
    const { _top: top, _skip: skip } = this;
    if (top != null && skip != null) return ` limit ${+top} offset ${+skip}`;
    if (top != null) return ` limit ${+top}`;
    if (skip != null) return ` offset ${+skip}`;
    return "";
  }

  protected buildSelectCountStatement(replacements: any[]): string {
    replacements.push(this.entity.name.toLowerCase());
    return `select count(all) from $${replacements.length}`;
  }

  protected buildSelectStatement(replacements: any[]): string {
    throw new Error("Not yet implemented");
  }

  protected buildWhereStatement(replacements: any[]): string {
    const filter = this._where;
    if (!filter) return "";
    const query = this.buildFilterQuery(replacements, filter);
    if (!query) return "";
    return ` where ${query}`;
  }

  protected buildFilterQuery(replacements: any[], filter: Filter<T>): string {
    switch (filter.op) {
      case "and":
      case "or":
        return this.buildLogicalSetFilter(replacements, filter);
      case "not":
        return this.buildLogicalNotFilter(replacements, filter);
      case "eq":
      case "ne":
      case "gt":
      case "lt":
      case "ge":
      case "le":
        return this.buildComparisonFilter(replacements, filter);
      case "contains":
      case "not-contains":
      case "like":
      case "not-like":
      case "starts-with":
      case "not-starts-with":
      case "ends-with":
      case "not-ends-with":
      case "match":
      case "not-match":
        return this.buildTextFilter(replacements, filter);
      case "null":
      case "not-null":
        return this.buildNullFilter(replacements, filter);
      case "in":
      case "not-in":
        return this.buildSetFilter(replacements, filter);
      case "raw":
        return this.buildRawFilter(replacements, filter);
      default:
        throw new UnsupportedOperation(`Unsupported filter ${filter.op}`);
    }
  }

  protected buildLogicalSetFilter(replacements: any[], filter: LogicalSetFilter<T>) {
    if (filter.filters.length === 0) return "";
    const relevant = filter.filters.map(this.buildFilterQuery.bind(this, replacements)).filter(it => it);
    if (!relevant) return "";
    return `(${relevant.join(` ${filter.op} `)})`;
  }

  protected buildLogicalNotFilter(replacements: any[], filter: LogicalNotFilter<T>) {
    const it = this.buildFilterQuery(replacements, filter.filter);
    return it ? "not " + it : "";
  }

  protected buildComparisonFilter(replacements: any[], filter: ComparisonFilter<T>) {
    const { op, field, value } = filter;
    replacements.push(field, value);
    return `$${replacements.length - 1} ${op} $${replacements.length}`;
  }

  protected buildRawFilter(replacements: any[], filter: RawFilter) {
    const { query, replacements: namedReplacements } = filter;
    const counted: Record<string, number> = {};
    return query.replace(/:([A-Za-z0-9]+)/g, (_, name) => {
      if (counted[name]) return `$${counted[name]}`;
      replacements.push(namedReplacements![name]);
      const index = (counted[name] = replacements.length);
      return `$${index}`;
    });
  }

  protected buildTextFilter(replacements: any[], filter: TextFilter<T>) {
    const { op, field, value } = filter;
    replacements.push(field, value);
    switch (op) {
      case "contains":
        return `$${replacements.length - 1} like %$${replacements.length}%`;
      case "not-contains":
        return `$${replacements.length - 1} not like %$${replacements.length}%`;
      case "like":
        return `$${replacements.length - 1} like $${replacements.length}`;
      case "not-like":
        return `$${replacements.length - 1} not like $${replacements.length}`;
      case "starts-with":
        return `$${replacements.length - 1} like $${replacements.length}%`;
      case "not-starts-with":
        return `$${replacements.length - 1} not like $${replacements.length}%`;
      case "ends-with":
        return `$${replacements.length - 1} like %$${replacements.length}`;
      case "not-ends-with":
        return `$${replacements.length - 1} not like %$${replacements.length}`;
      case "match":
        return `$${replacements.length - 1} ~ $${replacements.length}`;
      case "not-match":
        return `$${replacements.length - 1} !~ $${replacements.length}`;
    }
  }

  protected buildNullFilter(replacements: any[], filter: SetValueFilter<T>) {
    const { op, field } = filter;
    replacements.push(field);
    return op === "null" ? `$${replacements.length} is null` : `$${replacements.length} is not null`;
  }

  protected buildSetFilter(replacements: any[], filter: SetFilter<T>) {
    const { op, field, items } = filter;
    if (!items.length) return op === "in" ? "1=0" : "";
    let index = replacements.length + 1;
    replacements.push(field, ...items);
    return `$${index++} ${op === "in" ? "in" : "not in"} (${items.map(() => index++).join(",")})`;
  }
}
