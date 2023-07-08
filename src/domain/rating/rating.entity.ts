import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {BasicEntity} from "../../config/basic.entity";
import {UsersEntity} from "../users/users.entity";
import {PostsEntity} from "../posts/posts.entity";

interface Rating {
    user: UsersEntity;
    post: PostsEntity;
    rate: number;
}

@Entity("rating")
export class RatingEntity extends BasicEntity implements Rating {
    @OneToOne(() => PostsEntity)
    @JoinColumn()
    post: PostsEntity;

    @Column()
    postId: number

    @OneToOne(() => UsersEntity)
    @JoinColumn()
    user: UsersEntity;

    @Column()
    userId: number

    @Column()
    rate: number;

    constructor(post: PostsEntity, postId: number, user: UsersEntity, userId: number, rate: number) {
        super();
        this.post = post
        this.postId = postId
        this.user = user
        this.userId = userId
        this.rate = rate
    }
}