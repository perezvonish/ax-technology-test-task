import {Column, Entity, JoinTable, OneToMany} from "typeorm";
import {BasicEntity} from "../../config/basic.entity";
import {PostsEntity} from "../posts/posts.entity";

interface User  {
    id: number;
    email: string;
    password: string;
    posts: PostsEntity[];
}

@Entity("users")
export class UsersEntity extends BasicEntity implements User {
    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 0})
    rating: number

    @OneToMany(() => PostsEntity, (post) => post.author, {
        cascade: ["insert", "update", "soft-remove"]
    })
    posts: PostsEntity[]

    constructor(email: string, password: string) {
        super();
        this.email = email
        this.password = password
    }
}