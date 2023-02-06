import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./users.entity";
import {Attachments} from "./attachments.entity";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: 'Home'})
    name: string

    @Column({default: 'home'})
    nameIcon: string;

    @Column({default: 'home'})
    categoryUrl: string

    @ManyToOne(() => Users, (user) => user.categories, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: Users

    @OneToMany(() => Attachments, (attachment) => attachment.category)
    attachments: Attachments[]
}
