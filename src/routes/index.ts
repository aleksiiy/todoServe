import {Router} from 'express';
const index = Router();

import categoryRouter from "../routes/category.router";
import attachmentRoute from "../routes/attachment.route";

index.use('/categories', categoryRouter);
index.use('/attachments', attachmentRoute);

export default index;
