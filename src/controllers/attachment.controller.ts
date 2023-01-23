import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Attachments} from "../entities/attachments.entity";
import response from "../helpers/response";
import {Categories} from "../entities/categories.entity";

const attachmentsRepository = AppDataSource.getRepository(Attachments);
const categoryRepository = AppDataSource.getRepository(Categories);

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const {type, icon, title} = req.body;
        const categoryId = req.body.categoryId ? req.body.categoryId.toString() : undefined;
        const attachmentId = req.body.attachmentId ? req.body.attachmentId.toString() : undefined;

        const data = { icon, type, title }
        let category, attachment;
        if (categoryId && !attachmentId) {
            category = await categoryRepository.findOneByOrFail({id: categoryId});
            Object.assign(data, {category});
        }
        if (attachmentId) {
            attachment = await attachmentsRepository.findOneByOrFail({id: attachmentId});
            Object.assign(data, {attachment});

        }
        let result;
        switch (type) {
            case "files": {
                for (const file of req.files) {
                    await attachmentsRepository.save({
                        ...data,
                        title: file.originalname,
                        localFileName: file.filename
                    })
                }
                response(res, 201, "File was save");
                return;
            }
            default: {
                Object.assign(data, {description: req.body.description ? req.body.description : ""});
                result = await attachmentsRepository.save({
                    ...data,
                });
                break;
            }
        }
        response(res, 201, result);
    } catch (err) {
        console.error("ERROR::", err);
        response(res, 400, err);
    }
}

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const attachmentId = req.params.id;
        const result = await attachmentsRepository.findOneOrFail({where: {
                id: attachmentId
            }, relations: {
                attachmentsChildren: true
            }});
        response(res, 200, result);
    } catch (err) {
        console.error("ERROR::", err);
        response(res, 400, err);
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {

}

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await attachmentsRepository.delete({id : req.params.id});
        response(res, 200, "", "Attachment deleted successfully");
    } catch (err) {
        response(res, 500, err)
    }
}
