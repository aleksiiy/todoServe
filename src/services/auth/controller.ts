import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../data-source";
import nUser, {Users} from "../../entities/users.entity";
import response from "../../helpers/response";
import {generateToken} from "../../middlewares/auth.middleware";
import {Categories} from "../../entities/categories.entity";

const userRepository = AppDataSource.getRepository(Users);
const categoryRepository = AppDataSource.getRepository(Categories);

const JWT_TOKEN_EXPIRATION = 3600;
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: Users = req.body;
    try {
        const result = await userRepository.findOneByOrFail({
            email: data.email
        });
        if (await nUser.comparisonPassword(data, result)) {
            res.setHeader(
                'Set-Cookie',
                `X-AUTH-TOKEN=${generateToken(result)}; Max-Age=${JWT_TOKEN_EXPIRATION}; Path=/; SameSite=Strict; Secure; HttpOnly`
            )
            response(res, 200, {user: {
                    id: result.id,
                    email: result.email
                }});
        } else {
            response(res, 404, 'Email or password is not correct');
        }
    } catch (err) {
        response(res, 400, err);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: Users = req.body;
        const check = await userRepository.findOneBy({
            email: data.email
        });
        if(!check) {
            const result = await nUser.create(data, userRepository);
            await categoryRepository.save({
                user: result
            });
            res.setHeader(
                'Set-Cookie',
                `X-AUTH-TOKEN=${generateToken(result)}; Max-Age=${JWT_TOKEN_EXPIRATION}; Path=/; SameSite=Strict; Secure; HttpOnly`
            )
            response(res, 200, {user: {
                    id: result.id,
                    email: result.email
                }});
        } else {
            response(res, 409, 'Email used');
        }
    } catch (err) {
        response(res, 500, err);
    }
    next();
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.setHeader(
        'Set-Cookie',
        `X-AUTH-TOKEN=; Max-Age=0; Path=/`
    )
    response(res, 200, 'logout');
}
