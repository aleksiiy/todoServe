import express, {Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"
import {AppDataSource} from "./data-source";

dotenv.config();

const app: Express = express();
const port = process.env.NODE_EXPRESS_PORT;

import auth from "./services/auth/router";
import index from "./routes";
import {AuthMiddleware} from "./middlewares/auth.middleware";

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/api/lifeCheck", (req: Request, res: Response, next: NextFunction) => {
    res.send(`Good, time: ${new Date()}`);
    next();
});
app.use("/api/v1/auth", auth);
// app.use(AuthMiddleware);
app.use("/api/v1", AuthMiddleware, index);
app.use("*", (req: Request, res: Response) => {
    res.status(404).send();
})
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log("--------*****--------");
            console.log("Database is work!")
            console.log("--------*****--------");
        }).catch((err) => {
            console.log("--------*****--------");
            console.log(`Error: ${err}`);
            console.log("--------*****--------");
        })
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});