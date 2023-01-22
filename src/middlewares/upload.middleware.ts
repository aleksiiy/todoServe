import multer from "multer";
import moment from "moment";
import {Request} from "express";
const UPLOAD_FOLDER = 'uploads/';

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: (error: (Error | null), path: string) => void) {

        cb(null, UPLOAD_FOLDER)
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {

    }
});

export const multer = multer({

});
