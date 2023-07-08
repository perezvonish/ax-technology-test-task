import {Injectable} from "@nestjs/common";
import {BasicRepository} from "../../config/basic.interface";
import {UsersEntity} from "../../domain/users/users.entity";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersRepository implements BasicRepository<UsersEntity> {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly repo: Repository<UsersEntity>
    ) {}
    
    find(options: FindManyOptions<UsersEntity>): Promise<UsersEntity[] | undefined> {
        return this.repo.find(options)
    }

    findOne(where: FindOneOptions<UsersEntity>): Promise<UsersEntity | undefined> {
        return this.repo.findOne(where)
    }

    async count(options: FindManyOptions<UsersEntity>): Promise<number> {
        return await this.repo.count(options)
    }

    save(data): Promise<UsersEntity> {
        return this.repo.save(data)
    }

    async softDelete(id: number): Promise<void> {
        await this.repo.softDelete(id)
    }
}