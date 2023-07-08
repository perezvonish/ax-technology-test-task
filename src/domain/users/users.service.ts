import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from "../../infrastructure/repositories/users.repository";
import {FindManyOptions, FindOneOptions} from "typeorm";
import {UsersEntity} from "./users.entity";
import {UserResponse, UsersListResponse} from "../../application/dto/users/users.response";
import {UserGetRequest, UsersListRequest} from "../../application/dto/users/users.request";
import {I18nService} from "nestjs-i18n";
import {PostsEntity} from "../posts/posts.entity";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly i18n: I18nService
    ) {}

    async getUser({id}: UserGetRequest): Promise<UserResponse> {
        const user = await this.usersRepository.findOne({where: {id}})
        if (!user) {
            throw new NotFoundException(this.i18n.t('en.exceptions.user.notFound'))
        }

        return new UserResponse(user)
    }

    async getUsersList({email, page, rating, order}: UsersListRequest): Promise<UsersListResponse> {
        const options: FindManyOptions<UsersEntity> = {
            where: {
                email,
                rating,
            },
            skip: 10 * page,
            order: {
                email: order
            }
        }

        const count = await this.usersRepository.count(options)
        if (count == 0) {
            return new UsersListResponse([], 0)
        }

        const users = await this.usersRepository.find(options)
        const usersResponse = users.map((user) => {
            return new UserResponse(user)
        })

        return new UsersListResponse(usersResponse, count)
    }

    async updateRating(ratings: [PostsEntity[], number], author: UsersEntity) {
        let sum = 0
        const user = await this.usersRepository.findOne({where: {id: author.id}})

        const rates = ratings[0]
        for (let i = 0; i < rates.length; i++) {
            sum += rates[i].rating
        }
        user.rating = sum / ratings[1]

        return await this.usersRepository.save(user)
    }

    async findOne(options: FindOneOptions<UsersEntity>): Promise<UsersEntity | undefined> {
        return this.usersRepository.findOne(options)
    }

    async save(data): Promise<UsersEntity> {
        return this.usersRepository.save(data)
    }
}
