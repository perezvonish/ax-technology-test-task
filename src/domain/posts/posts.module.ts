import { Module } from '@nestjs/common';
import {PostsService} from "./posts.service";
import {PostsController} from "../../application/controllers/posts.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostsEntity} from "./posts.entity";
import {UsersModule} from "../users/users.module";
import {PostsRepository} from "../../infrastructure/repositories/posts.repository";
import {RatingRepository} from "../../infrastructure/repositories/rating.repository";
import {RatingEntity} from "../rating/rating.entity";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([PostsEntity, RatingEntity]), UsersModule],
    controllers: [PostsController],
    providers: [PostsService, PostsRepository, RatingRepository, JwtService]
})
export class PostsModule {}
