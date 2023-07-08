import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {Posts} from "../../../domain/posts/posts.entity";
import {i18nValidationMessage} from "nestjs-i18n";

export enum SortType {
    ASC = "ASC",
    DESC = "DESC"
}

export class PostsCreateRequest implements Omit<Posts, "id" | "readTime" | "author"> {
    @ApiProperty()
    @MinLength(8)
    @MaxLength(128)
    @IsString({ message: i18nValidationMessage("validation.isString")})
    title: string

    @ApiProperty()
    @IsString({ message: i18nValidationMessage("validation.isString")})
    @MinLength(16)
    @MaxLength(8192)
    content: string;
}

export class PostsGetByIdRequest {
    @ApiProperty()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    id: number
}

export class PostsGetListRequest {
    @ApiProperty()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    authorId: number

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: i18nValidationMessage("validation.isNumber")})
    page?: number

    @ApiProperty({enum: SortType})
    @IsOptional()
    @IsEnum(SortType)
    order?: SortType = SortType.ASC
}

export class PostsChangeRatingRequest {
    @ApiProperty()
    postId: number

    @ApiProperty()
    rate: number
}