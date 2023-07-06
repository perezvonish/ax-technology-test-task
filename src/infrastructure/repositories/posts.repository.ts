import {Injectable} from "@nestjs/common";
import {BasicRepository} from "../../config/basic.interface";
import {PostsEntity} from "../../domain/posts/posts.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneOptions, FindOptionsWhere, Repository} from "typeorm";

@Injectable()
export class PostsRepository implements BasicRepository<PostsEntity> {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly repo: Repository<PostsEntity>
    ) {}

    find(where: FindOptionsWhere<PostsEntity>): Promise<PostsEntity[] | undefined> {
        return this.repo.find({where})
    }

    findOne(where: FindOneOptions<PostsEntity>): Promise<PostsEntity | undefined> {
        return this.repo.findOne(where)
    }

    save(data): Promise<PostsEntity> {
        return this.repo.save(data)
    }

    async softDelete(id: number): Promise<void> {
        await this.repo.softDelete(id)
    }
}