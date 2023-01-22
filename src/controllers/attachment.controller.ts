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
        let result;
        switch (type) {
            case "folder": {
                if (categoryId && !attachmentId) {
                    const category = await categoryRepository.findOneByOrFail({id: categoryId});
                    result = await attachmentsRepository.save({
                        icon, type, title, category
                    });
                }
                if (attachmentId) {
                    const attachment = await attachmentsRepository.findOneByOrFail({id: attachmentId});
                    result = await attachmentsRepository.save({
                        icon, type, title, attachment
                    });
                }
                break;
            }
            default:
                break;
        }
        response(res, 200, result);
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

}
