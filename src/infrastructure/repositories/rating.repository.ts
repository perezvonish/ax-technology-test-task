import {Injectable} from "@nestjs/common";
import {BasicRepository} from "../../config/basic.interface";
import {RatingEntity} from "../../domain/rating/rating.entity";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RatingRepository implements BasicRepository<RatingEntity> {
    constructor(
        @InjectRepository(RatingEntity)
        private readonly repo: Repository<RatingEntity>
    ) {
    }

    find(options: FindManyOptions<RatingEntity>): Promise<RatingEntity[] | undefined> {
        return this.repo.find(options)
    }

    findOne(options: FindOneOptions<RatingEntity>): Promise<RatingEntity | undefined> {
        return this.repo.findOne(options)
    }

    save(data: RatingEntity): Promise<RatingEntity> {
        return this.repo.save(data)
    }

    async softDelete(id: number): Promise<void> {
        await this.repo.softDelete(id)
    }

}