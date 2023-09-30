import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;


// We add the userId to the payload of the token to validate the user later
export const generateToken = (res: Response, userId: number) => {
// create a token
    const token = jwt.sign({data: userId}, JWT_SECRET, {expiresIn: '30d'});

// send a token as a cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        // this should be strict to prevent CSRF attacks but I can't do that because the frontend is on a different domain
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days

    });
};

export default generateToken;