import {FindOneOptions, FindOptionsWhere} from "typeorm";

export interface BasicRepository<T> {
    find(where: FindOptionsWhere<T>): Promise<T[] | undefined>
    findOne(where: FindOneOptions<T>): Promise<T | undefined>
    save(data): Promise<T>
    softDelete(id: number): Promise<void>
}