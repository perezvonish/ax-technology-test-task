import {Column, Entity, JoinColumn, JoinTable, ManyToOne} from "typeorm";
import {BasicEntity} from "../../config/basic.entity";
import {UsersEntity} from "../users/users.entity";

export interface Posts {
    id: number;
    title: string;
    content: string;
    readTime: number;
    author: UsersEntity;
}

@Entity("posts")
export class PostsEntity extends BasicEntity implements Posts {
    @Column()
    title: string

    @Column()
    content: string

    @Column()
    readTime: number

    @Column({nullable: true})
    rating: number

    @ManyToOne(() => UsersEntity, (user) => user.posts, {
        cascade: ["insert", "update", "soft-remove", "recover"]
    })
    @JoinColumn()
    author: UsersEntity

    @Column()
    authorId: number

    constructor(title: string, content: string, readTime: number, author: UsersEntity) {
        super();
        this.title = title
        this.content = content
        this.readTime = readTime
        this.author = author
        this.rating = 1
    }
}