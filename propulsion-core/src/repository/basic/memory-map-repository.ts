import {Document, DocumentMeta} from "@/document";
import {FetchOptions, Filter, Repository, SingleFetchOptions, Sorter} from "@/repository";
import {NoArgsConstructor} from "@/types";

function nextId() {
  const date = ("000000000000"+(+new Date()).toString(16)).substr(-12);
  const incr = ("00" + (++nextId.current).toString(16)).substr(-2);
  const rand = ("00" + (Math.random() * 0xFF).toString(16)).substr(-2);
  return date + incr + rand;
}
nextId.current = 0;

export class MemoryMapRepository<T> implements Repository<T, string> {

  constructor(
    private cls: NoArgsConstructor<T>,
    private idField: keyof T
  ) {}

  public type() { return this.cls; }
  public describe() { return Document.getMeta(this.cls); }

  private state: Map<string, T> = new Map<string, T>();

  public async count(options?: FetchOptions<T>): Promise<number> {
    return (await this.findAll(options)).length;
  }

  public async create(entity: Partial<T>): Promise<T> {
    const id = nextId();
    const created = Document.create(this.cls, {
      ...entity,
      [this.idField]: id
    });
    this.state.set(id, created);
    return created;
  }

  public async delete(id: string): Promise<void> {
    if (this.state.has(id))
      this.state.delete(id);
  }

  public async findAll(options?: FetchOptions<T>): Promise<T[]> {
    const {fields, filter, skip, sort, top} = {...options};

    let entries = [...this.state.values()];

    if (filter)
      entries = this.filterEntries(entries, filter);
    if (fields)
      entries = this.transformFields(entries, fields);
    if (sort)
      entries = this.sortEntries(entries, sort);

    return entries.slice(skip, top);
  }

  public async findOne(id: string, options?: SingleFetchOptions<T>): Promise<T> {
    let result = this.state.get(id);
    if (!result)
      throw new Error("No such entity");

    if (options && options.fields)
      [result] = this.transformFields([result], options.fields);

    return result;
  }

  public async update(id: string, entity: Partial<T>, partialUpdate?: boolean): Promise<T> {
    if (!this.state.has(id))
      throw new Error("No such entity");

    if (!partialUpdate) {
      this.state.set(id, Document.create(this.cls, {...entity, [this.idField]: id}));
      return this.findOne(id);
    } else {
      const it = await this.findOne(id);
      Object.assign(it, {...entity, [this.idField]: id});
      this.state.set(id, it);
      return it;
    }
  }

  private sortEntries(entries: T[], sorters: Sorter<T> | Sorter<T>[]) {
    return entries.sort(this.createSorterFunction(Array.isArray(sorters) ? sorters : [sorters]));
  }

  private transformFields(entries: T[], fields: (keyof T)[]): T[] {
    return entries.map(entry => fields.reduce((data, field) => ({...data, [field]: entry[field]}), {} as Partial<T>) as T);
  }

  private filterEntries(entries: T[], filter: Filter<T> | Filter<T>[]) {
    if (Array.isArray(filter)) filter = { op: "and", filters: filter };
    return entries.filter(this.createFilterFunction(filter));
  }

  private createSorterFunction(sorters: Sorter<T, keyof T>[]) {
    return sorters.map(sorter => (data1: T, data2: T) =>
      data1[sorter.field] > data2[sorter.field] ? sorter.ascending ? -1 : 1 :
      data1[sorter.field] < data2[sorter.field] ? sorter.ascending ? 1 : -1 : 0
    ).reduce((first, second) => (data1: T, data2: T) => first(data1, data2) || second(data1, data2));
  }

  private createFilterFunction(filter: Filter<T, keyof T>): (data: T) => boolean {
    switch (filter.op) {
      case "and": return (data: T) => filter.filters.map(this.createFilterFunction.bind(this)).every(one => one(data));
      case "or":  return (data: T) => filter.filters.map(this.createFilterFunction.bind(this)).some(one => one(data));
      case "not": return (data: T) => !this.createFilterFunction(filter.filter)(data);

      case "in": return (data: T) => filter.items.includes(data[filter.field]);
      case "ni": return (data: T) => !filter.items.includes(data[filter.field]);

      case "nu": return (data: T) => data[filter.field] == null;
      case "nn": return (data: T) => data[filter.field] != null;

      case "eq": return (data: T) => data[filter.field] === filter.value;
      case "ne": return (data: T) => data[filter.field] !== filter.value;

      case "gt": return (data: T) => data[filter.field] > filter.value;
      case "ge": return (data: T) => data[filter.field] >= filter.value;

      case "lt": return (data: T) => data[filter.field] < filter.value;
      case "le": return (data: T) => data[filter.field] <= filter.value;

      case "ct": return (data: T) => String(data[filter.field]).includes(String(filter.value));
      case "nc": return (data: T) => !String(data[filter.field]).includes(String(filter.value));
      case "sw": return (data: T) => String(data[filter.field]).startsWith(String(filter.value));
      case "ew": return (data: T) => String(data[filter.field]).endsWith(String(filter.value));
      case "mt": return (data: T) => new RegExp(String(filter.value)).test(String(data[filter.field]));

      default:
        throw new Error("Not yet implemented.");
    }
  }
}
