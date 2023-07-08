import {UsersEntity} from "../../../domain/users/users.entity";

export interface AuthJwtSign {
    id: number
    email: string
}

export interface IRequestUser extends Request {
    user: UsersEntity;
}