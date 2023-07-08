import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, IsStrongPassword} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class AuthRegisterRequest {
    @ApiProperty()
    @IsEmail({}, { message: i18nValidationMessage("validation.isEmail")})
    email: string

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }, { message: i18nValidationMessage("validation.isStrongPassword")})
    password: string

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }, { message: i18nValidationMessage("validation.isStrongPassword")})
    passwordRepeat: string
}

export class AuthLoginRequest {
    @ApiProperty()
    @IsEmail({}, { message: i18nValidationMessage("validation.isEmail")})
    email: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage("validation.isString")})
    password: string
}