import {Injectable} from "@nestjs/common";
import {BasicRepository} from "../../config/basic.interface";
import {PostsEntity} from "../../domain/posts/posts.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, FindOneOptions, FindOptions, FindOptionsWhere, Repository} from "typeorm";

@Injectable()
export class PostsRepository implements BasicRepository<PostsEntity> {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly repo: Repository<PostsEntity>
    ) {}

    find(options: FindManyOptions<PostsEntity>): Promise<PostsEntity[] | undefined> {
        return this.repo.find(options)
    }

    findOne(options: FindOneOptions<PostsEntity>): Promise<PostsEntity | undefined> {
        return this.repo.findOne(options)
    }

    async findAndCount(options: FindManyOptions<PostsEntity>): Promise<[PostsEntity[], number]> {
        return await this.repo.findAndCount(options)
    }

    async count(options: FindManyOptions<PostsEntity>): Promise<number> {
        return await this.repo.count(options)
    }

    save(data: PostsEntity): Promise<PostsEntity> {
        return this.repo.save(data)
    }

    async softDelete(id: number): Promise<void> {
        await this.repo.softDelete(id)
    }
}