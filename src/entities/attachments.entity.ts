import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from "./categories.entity";

export type AttachmentsType = "file" | "folder" | "note"

@Entity()
export class Attachments {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({enum: ["files", "folder", "note"]})
    type: AttachmentsType

    @Column()
    icon: string

    @Column()
    title: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    localFileName: string

    @ManyToOne(() => Categories, (category) => category.attachments, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    category: Categories

    @OneToMany(() => Attachments, (attachment) => attachment.attachment)
    attachmentsChildren: Attachments[]

    @ManyToOne(() => Attachments, (attachment) => attachment.attachmentsChildren, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    attachment: Attachments
}
