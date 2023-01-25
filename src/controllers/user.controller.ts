import {NextFunction, Request, Response} from "express";
import response from "../helpers/response";


export const my = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
        id: req.headers.userId
    });
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        response(res, 200, '');
    } catch (err) {
        response(res, 500, err)
    }
}


