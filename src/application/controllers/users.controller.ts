import {Controller, Get, Param} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "../../domain/users/users.service";
import {UserGetRequest, UsersListRequest} from "../dto/users/users.request";
import {UserResponse, UsersListResponse} from "../dto/users/users.response";
import {CustomMessages} from "../../config/customMessages";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOkResponse({type: UserResponse})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.user.notFound})
    @Get(":id")
    getUser(@Param() param: UserGetRequest): Promise<UserResponse> {
        return this.usersService.getUser(param)
    }

    @ApiOkResponse({type: UsersListResponse})
    @Get("/list")
    getUsersList(@Param() param: UsersListRequest): Promise<UsersListResponse> {
        return this.usersService.getUsersList(param)
    }
}
