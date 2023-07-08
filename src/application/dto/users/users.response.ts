import {ApiProperty} from "@nestjs/swagger";
import {PostsEntity} from "../../../domain/posts/posts.entity";
import {UsersEntity} from "../../../domain/users/users.entity";

export class UserResponse {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    rating: number

    @ApiProperty({type: PostsEntity, isArray: true})
    posts: PostsEntity[];

    constructor(user: UsersEntity) {
        this.id = user.id
        this.email = user.email
        this.posts = user.posts
    }
}

export class UsersListResponse {
    @ApiProperty({type: UserResponse, isArray: true})
    users: UserResponse[]

    @ApiProperty()
    count: number

    constructor(users: UserResponse[], count: number) {
        this.users = users
        this.count = count
    }
}