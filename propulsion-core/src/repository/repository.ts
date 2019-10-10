import {DocumentMeta} from "@/document";
import {Sorter, Filter, SingleFetchOptions, FetchOptions} from "@/repository";
import {NoArgsConstructor} from "@/types";

export interface ReadOnlyRepository<T, F extends keyof T, ID extends T[F] = T[F]> {
    findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T>;
    findMany(ids: ID[], options?: SingleFetchOptions<T>): Promise<T[]>;
    findAll(options?: FetchOptions<T>): Promise<T[]>;
    findAllAndCount(options?: FetchOptions<T>): Promise<{count: number, data: T[]}>;
    count(options?: FetchOptions<T>): Promise<number>;
}

export interface Repository<T, F extends keyof T, ID extends T[F] = T[F]> extends ReadOnlyRepository<T, F, ID> {
    createOne(entity: Partial<T>): Promise<T>;
    createMany(entities: Partial<T>[]): Promise<T[]>;

    updateOne(entity: Partial<T>, partialUpdate: boolean): Promise<T>;
    updateMany(entities: Partial<T>[], partialUpdate: boolean): Promise<T[]>;

    deleteOne(id: ID): Promise<void>;
    deleteMany(ids: ID[]): Promise<void>;

    describe(): DocumentMeta<NoArgsConstructor<T>>;
    type(): NoArgsConstructor<T>;
}

