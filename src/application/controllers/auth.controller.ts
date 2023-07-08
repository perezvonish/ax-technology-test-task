import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../../domain/auth/auth.service";
import {AuthLoginRequest, AuthRegisterRequest} from "../dto/auth/auth.request";
import {AuthLoginResponse, AuthRegisterResponse} from "../dto/auth/auth.response";
import {ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CustomMessages} from "../../config/customMessages";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOkResponse({type: AuthRegisterResponse})
    @ApiForbiddenResponse({description: CustomMessages.exceptions.auth.register.notTheSame})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.user.notFound})
    @Post('/register')
    register(@Body() body: AuthRegisterRequest): Promise<AuthRegisterResponse> {
        return this.authService.register(body)
    }

    @ApiCreatedResponse({type: AuthLoginResponse})
    @ApiNotFoundResponse({description: CustomMessages.exceptions.user.notFound})
    @ApiForbiddenResponse({description: CustomMessages.exceptions.auth.login.passwordIncorrect})
    @Post("/login")
    login(@Body() body: AuthLoginRequest): Promise<AuthLoginResponse> {
        return this.authService.login(body)
    }
}