import {FindManyOptions, FindOneOptions} from "typeorm";

export interface BasicRepository<T> {
    find(options: FindManyOptions<T>): Promise<T[] | undefined>
    findOne(options: FindOneOptions<T>): Promise<T | undefined>
    save(data): Promise<T>
    softDelete(id: number): Promise<void>
}