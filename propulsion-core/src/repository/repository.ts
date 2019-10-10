import {DocumentMeta} from "@/document";
import {Sorter, Filter, SingleFetchOptions, FetchOptions} from "@/repository";
import {NoArgsConstructor} from "@/types";

export interface Repository<T, F extends keyof T, ID extends T[F] = T[F]> {
    findOne(id: ID, options?: SingleFetchOptions<T>): Promise<T>;

    findAll(options?: FetchOptions<T>): Promise<T[]>;

    count(options?: FetchOptions<T>): Promise<number>;

    create(entity: Partial<T>): Promise<T>;

    update(id: ID, entity: Partial<T>, partialUpdate: boolean): Promise<T>;

    delete(id: ID): Promise<void>;

    describe(): DocumentMeta<NoArgsConstructor<T>>;
    type(): NoArgsConstructor<T>;
}

