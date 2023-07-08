import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsNumber, IsOptional} from "class-validator";
import {SortType} from "../posts/posts.request";
import {i18nValidationMessage} from "nestjs-i18n";

export class UserGetRequest {
    @ApiProperty()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    id: number
}

export class UsersListRequest {
    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: i18nValidationMessage("validation.isEmail")})
    email?: string

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    rating?: number

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    page?: number = 0

    @ApiProperty({enum: SortType})
    @IsEnum(SortType)
    @IsOptional()
    order?: SortType = SortType.ASC
}