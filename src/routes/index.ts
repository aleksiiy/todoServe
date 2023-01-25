import {Router} from 'express';
const index = Router();

import userRouter from "./user.router";
import categoryRouter from "./category.router";
import attachmentRoute from "./attachment.router";

index.use('/user', userRouter);
index.use('/categories', categoryRouter);
index.use('/attachments', attachmentRoute);

export default index;
