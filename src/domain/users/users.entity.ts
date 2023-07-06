import {Column, Entity, OneToMany} from "typeorm";
import {BasicEntity} from "../../config/basic.entity";
import {PostsEntity} from "../posts/posts.entity";

interface User  {
    id: number;
    email: string;
    password: string;
    posts: PostsEntity[];
}

@Entity()
export class UsersEntity extends BasicEntity implements User {
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    rating: number

    @OneToMany(() => PostsEntity, (post) => post.author)
    posts: PostsEntity[]
}