import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from "@nestjs/common";
import {PostsService} from "../../domain/posts/posts.service";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
    PostsChangeRatingRequest,
    PostsCreateRequest,
    PostsGetByIdRequest,
    PostsGetListRequest
} from "../dto/posts/posts.request";
import {
    PostsResponse,
    PostsListResponse,
    PostsChangeRatingResponse
} from "../dto/posts/posts.response";
import {IRequestUser} from "../dto/auth/auth.interface";
import {CustomMessages} from "../../config/customMessages";
import {AuthGuard} from "../guards/jwt.guard";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @ApiCreatedResponse({type: PostsResponse})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.user.notFound})
    @UseGuards(AuthGuard)
    @Post("/create")
    create(@Req() { user }: IRequestUser, @Body() body: PostsCreateRequest): Promise<PostsResponse> { //: Promise<PostsCreateResponse>
        return this.postsService.create(user, body);
    }

    @ApiOkResponse({type: PostsResponse})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.posts.notFound})
    @Get(":id")
    getPostById(@Param() param: PostsGetByIdRequest): Promise<PostsResponse> {
        return this.postsService.getPostById(param)
    }

    @ApiOkResponse({type: PostsListResponse})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.user.notFound})
    @Get()
    getPostsList(@Query() param: PostsGetListRequest): Promise<PostsListResponse> {
        return this.postsService.getPostsList(param)
    }

    @ApiOkResponse({type: PostsChangeRatingResponse})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse({description: CustomMessages.exceptions.posts.notFound})
    @UseGuards(AuthGuard)
    @Post("/rate")
    changeRating(@Req() { user }: IRequestUser,  @Body() body: PostsChangeRatingRequest): Promise<PostsChangeRatingResponse> {
        return this.postsService.changeRating(user, body)
    }
}