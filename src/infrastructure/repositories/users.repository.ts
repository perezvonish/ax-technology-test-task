import {Injectable} from "@nestjs/common";
import {BasicRepository} from "../../config/basic.interface";
import {UsersEntity} from "../../domain/users/users.entity";
import {FindOneOptions, FindOptionsWhere, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersRepository implements BasicRepository<UsersEntity> {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly repo: Repository<UsersEntity>
    ) {}
    
    find(where: FindOptionsWhere<UsersEntity>): Promise<UsersEntity[] | undefined> {
        return this.repo.find({where})
    }

    findOne(where: FindOneOptions<UsersEntity>): Promise<UsersEntity | undefined> {
        return this.repo.findOne(where)
    }

    save(data): Promise<UsersEntity> {
        return this.repo.save(data)
    }

    async softDelete(id: number): Promise<void> {
        await this.repo.softDelete(id)
    }
}