import {Filter} from "@/repository/filter";

type Sorter = any;

export interface FetchOptions<T = any> {
    filter?: Filter<T>[] | Filter<T>;
    sort?: Sorter[] | Sorter;
    top?: number;
    skip?: number;
    fields?: (keyof T)[];
}

export interface SingleFetchOptions<T> {
    fields?: (keyof T)[];
}

export interface Repository<T, ID = string> {
    findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T>;

    findAll(options?: FetchOptions<T>): Promise<T[]>;

    count(): Promise<number>;

    create(entity: Partial<T>): Promise<T>;

    update(id: ID, entity: Partial<T>, partialUpdate: boolean): Promise<T>;

    delete(id: ID): Promise<void>;
}

