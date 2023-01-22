import "reflect-metadata";
import {DataSource} from "typeorm";

import {Users} from "./entities/users.entity";
import {Categories} from "./entities/categories.entity";
import {Attachments} from "./entities/attachments.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin_qwer",
    database: "todo",
    synchronize: true,
    logging: false,
    entities: [Users, Categories, Attachments],
    migrations: [Users, Categories, Attachments]
});
