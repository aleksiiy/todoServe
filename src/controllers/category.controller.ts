import {Request, Response} from "express";
import {Categories} from "../entities/categories.entity";
import {AppDataSource} from "../data-source";
import response from "../helpers/response";
import {Users} from "../entities/users.entity";

const categoryRepository = AppDataSource.getRepository(Categories);
const userRepository = AppDataSource.getRepository(Users);
export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.headers.userId?.toString()
        const user = await userRepository.findOne({
            where: {
                id :id
            },
            relations: {
                categories: true
            }});
        response(res, 200, user?.categories);
    } catch (err) {
        response(res, 500, err)
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.id;
        const result = await categoryRepository.findOneByOrFail({
                id: categoryId
            });
        response(res, 200, result);
    } catch (err) {
        console.error("ERROR::", err);
        response(res, 400, err);
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.headers.userId?.toString();
        const {name, nameIcon, categoryUrl} = req.body;
        await categoryRepository.findOneByOrFail({categoryUrl: categoryUrl});
        const user = await userRepository.findOneBy({id: userId});
        if (userId && user) {
            const data ={
                name, nameIcon, categoryUrl, user
            };
            const result = await categoryRepository.save(data);
            response(res, 200, result);
        } else {
            response(res, 401, 'Unauthorized')
        }
    } catch (err) {
        response(res, 400, err.message);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {};

export const remove = async (req: Request, res: Response): Promise<void> => {};
