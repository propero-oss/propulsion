import {Sorter, Filter, SingleFetchOptions, FetchOptions} from "@/repository";

export interface Repository<T, ID = string> {
    findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T>;

    findAll(options?: FetchOptions<T>): Promise<T[]>;

    count(options?: FetchOptions<T>): Promise<number>;

    create(entity: Partial<T>): Promise<T>;

    update(id: ID, entity: Partial<T>, partialUpdate: boolean): Promise<T>;

    delete(id: ID): Promise<void>;
}

