import {Injectable, NotFoundException} from "@nestjs/common";
import {PostsRepository} from "../../infrastructure/repositories/posts.repository";
import {PostsResponse, PostsListResponse, PostsChangeRatingResponse} from "../../application/dto/posts/posts.response";
import {
    PostsChangeRatingRequest,
    PostsCreateRequest,
    PostsGetByIdRequest,
    PostsGetListRequest
} from "../../application/dto/posts/posts.request";
import {PostsEntity} from "./posts.entity";
import {UsersService} from "../users/users.service";
import {I18nService} from "nestjs-i18n";
import {FindManyOptions, FindOneOptions} from "typeorm";
import {UsersEntity} from "../users/users.entity";
import {RatingEntity} from "../rating/rating.entity";
import {RatingRepository} from "../../infrastructure/repositories/rating.repository";

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepository: PostsRepository,
        private readonly userService: UsersService,
        private readonly ratingRepository: RatingRepository,
        private readonly i18n: I18nService
    ) {}

    async create(user: UsersEntity, {title, content}: PostsCreateRequest): Promise<PostsResponse>  { //Promise<PostsCreateResponse>
        const readTime = this.calcReadTime(content)

        const author = await this.userService.findOne({where: {id: user.id}})
        if (!author) {
            throw new NotFoundException(this.i18n.t('en.exceptions.user.notFound'))
        }

        const newPost = new PostsEntity(title, content, readTime, author)
        await this.postsRepository.save(newPost)

        return new PostsResponse(newPost)
    }

    async getPostById({id}: PostsGetByIdRequest): Promise<PostsResponse> {
        const post = await this.findOne({where: {id}})

        console.log(post)

        if (!post) {
            throw new NotFoundException(this.i18n.t('en.exceptions.posts.notFound'))
        }

        return new PostsResponse(post)
    }

    async getPostsList(data: PostsGetListRequest): Promise<PostsListResponse> {
        const author = await this.userService.findOne({where: {id: data.authorId}})
        if (!author) {
            throw new NotFoundException(this.i18n.t('en.exceptions.user.notFound'))
        }

        const count = await this.postsRepository.count({where: {authorId: data.authorId}})
        if (!count) {
            return new PostsListResponse([], 0)
        }

        const skip = 10 * data.page

        const options: FindManyOptions<PostsEntity> = {
            where: {
                authorId: data.authorId
            },
            skip: skip,
            take: 5,
            order: {
                title: data.order
            },
            relations: ["author"]
        }

        const posts = await this.postsRepository.find(options)
        const postsResponse = posts.map((post) => {
            return new PostsResponse(post)
        })

        return new PostsListResponse(postsResponse, count)
    }

    async changeRating(user: UsersEntity, {postId, rate}: PostsChangeRatingRequest): Promise<PostsChangeRatingResponse> {
        const post = await this.postsRepository.findOne({where: {id: postId}, relations: ["author"]})
        if (!post) {
            throw new NotFoundException(this.i18n.t('en.exceptions.post.notFound'))
        }

        const options: FindOneOptions<RatingEntity> = {
            where: {
                userId: user.id,
                postId: post.id
            }
        }

        const prevRate = await this.ratingRepository.findOne(options)
        if (prevRate) {
            prevRate.rate = rate
            await this.ratingRepository.save(prevRate)

            await this.updateRating(user)

            return new PostsChangeRatingResponse(post, prevRate)
        }

        const newRating = new RatingEntity(post, postId, user, user.id, rate)
        await this.ratingRepository.save(newRating)

        await this.updateRating(user)

        return new PostsChangeRatingResponse(post, newRating)
    }

    private async updateRating(author: UsersEntity) {
        console.log("1")
        const updateOptions: FindManyOptions<PostsEntity> = {
            where: {
                authorId: author.id
            },
            select: [
                "rating"
            ]
        }

        const ratings = await this.postsRepository.findAndCount(updateOptions)
        if (ratings[1]) {
            await this.userService.updateRating(ratings, author)
        }
    }

    async findOne(options: FindOneOptions<PostsEntity>) {
        return await this.postsRepository.findOne(options)
    }

    private calcReadTime(text: string): number {
        return Math.round(text.length / 120) == 0 ? 1 : Math.round(text.length / 120)
    }
}