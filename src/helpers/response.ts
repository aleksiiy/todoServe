import {Response} from "express";

export default (res: Response, status: number, data: any, mess: string = '') => {
    if (399 > status) {
        res.status(status).json({
            data: data,
            mess: mess
        });
    } else {
        console.error(status, data);
        res.status(status).json({
            err: data.message ? data.message : data.message
        });
    }
};
