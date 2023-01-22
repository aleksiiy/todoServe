import {Entity, Column, PrimaryGeneratedColumn, Repository, OneToMany} from "typeorm";
import bcrypt from "bcrypt";
import {Categories} from "./categories.entity";
@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Categories, (category) => category.user)
    categories: Categories[]

    async create(user: Users, userRepository: Repository<Users>): Promise<Users> {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(13));
        return await userRepository.save(user);
    }

    async comparisonPassword(loginData: Users, user: Users): Promise<boolean> {
        return await bcrypt.compare(loginData.password, user.password);
    }
}

export default new Users();
interface IUser {
    email: string
    password: string
}
