import multer from "multer";
import moment from "moment";
import {Request} from "express";
import * as crypto from "crypto";

const UPLOAD_FOLDER = "src/uploads/";
const ACCEPTED_FORMATS = ["text/csv", "image/gif", "image/jpeg", "image/png", "application/pdf", "text/plain",
    "application/zip"]

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: (error: (Error | null), path: string) => void) {

        cb(null, UPLOAD_FOLDER)
    },
    filename(req: Request, file: Express.Multer.File, cb: (error: (Error | null), localFileName: string, originalFileName: string) => void) {
        const date = moment().format("DD.MM.YYYY_HH_mm_ss");
        const hash = crypto.randomUUID();
        cb(null, `${date}.${hash}`, file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: (Error | null), status: boolean) => void) => {
    if (ACCEPTED_FORMATS.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}
export default multer({storage, fileFilter, limits});
