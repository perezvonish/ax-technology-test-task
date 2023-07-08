import {ApiProperty} from "@nestjs/swagger";
import {UsersEntity} from "../../../domain/users/users.entity";

export class AuthRegisterResponse {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    createdAt: Date

    constructor(user: UsersEntity) {
        this.id = user.id
        this.email = user.email
        this.createdAt = user.createdAt
    }
}

export class AuthLoginResponse {
    @ApiProperty()
    accessToken: string
}