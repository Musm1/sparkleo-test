import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyToken= (req, res, next)=>{
    // get token from cookie of browser
    const token= req.cookies.access_token; // we named the access token in authcontroller
    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user= user;
        next(); // this helps get to the next function which is updateUser
    })
}