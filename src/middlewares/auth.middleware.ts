import jwt, { JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";

const JWT_SALT = process.env.NODE_JWT || '6fa4ce18-f82b-4e4d-acc9-577c4c39c8d9-b2da7dc0-af34-4139-a07a-429bdc401900';
const JWT_TOKEN_EXPIRATION = 3600;
export const generateToken = (user: { email: string, id: string }) => {
    return jwt.sign({
        userId: user.id,
        email: user.email
    }, JWT_SALT, {
        expiresIn: 3600 // one hour
    })
}

export const getHeaderToken = (req: Request): { status: boolean, data?: JwtPayload | string } => {
    if (req.cookies['X-AUTH-TOKEN']) {
        const token = req.cookies['X-AUTH-TOKEN'];
        const jwtData = jwt.verify(token, JWT_SALT, {complete: false});
        return {
            status: true,
            data: jwtData
        }
    } else {
        return {
            status: false
        };
    }
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const getToken = getHeaderToken(req)
        if(getToken.status) {
            if (typeof getToken.data !== "string" && getToken.data?.exp && getToken.data.exp * 1000 >= Date.now()) {
                const newJwtToken = generateToken({id: getToken.data.userId, email: getToken.data.email})
                res.setHeader(
                    'Set-Cookie',
                    `X-AUTH-TOKEN=${newJwtToken}; Max-Age=${JWT_TOKEN_EXPIRATION}; Path=/; SameSite=Strict; Secure; HttpOnly`
                );
                req.headers.userId = getToken.data.userId;
                next();
            } else {
                res.status(401).send();
            }
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(401).json({
            mess: err.message
        });
    }
}
