import {ApiProperty} from "@nestjs/swagger";
import {Posts, PostsEntity} from "../../../domain/posts/posts.entity";
import {UserResponse} from "../users/users.response";
import {RatingEntity} from "../../../domain/rating/rating.entity";

export class PostsCreateResponse implements Omit<Posts, "author"> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string

    @ApiProperty()
    content: string;

    @ApiProperty()
    readTime: number;

    @ApiProperty({type: UserResponse})
    author: UserResponse;
}

export class PostsResponse implements Omit<Posts, "author"> {
    @ApiProperty()
    id: number

    @ApiProperty()
    content: string;

    @ApiProperty()
    readTime: number;

    @ApiProperty()
    title: string;

    @ApiProperty({type: UserResponse})
    author: UserResponse

    constructor(post: PostsEntity) {
        this.id = post.id
        this.content = post.content
        this.readTime = post.readTime
        this.title = post.title
        this.author = new UserResponse(post.author)
    }
}

export class PostsChangeRatingResponse extends PostsResponse {
    @ApiProperty()
    rating: number

    constructor(post: PostsEntity, rating: RatingEntity) {
        super(post);
        this.rating = rating.rate
    }
}

export class PostsListResponse {
    @ApiProperty({type: PostsResponse, isArray: true})
    posts: PostsResponse[]

    @ApiProperty()
    count: number

    constructor(posts: PostsResponse[], count: number) {
        this.posts = posts
        this.count = count
    }
}