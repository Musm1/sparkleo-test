import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next)=>{
    const {username, email, password}= req.body;

    if(!username || !email || !password || username=== '' || email=== '' || password=== ''){
        next(errorHandler(400, "All fields are required"));
    }

    const hashPassword= bcryptjs.hashSync(password,10);

    const newUser= new User({username, email, password: hashPassword});

    try {
        await newUser.save();
        res.json('SignUp Successfull');
    } catch (error) {
        next(error);
    }
};

export const signin= async(req, res, next)=>{
    const {email, password}= req.body;
    //set a cookie inside a browser so later if user requests something we'll check
    //if the user is authenticated or not.
    
    if(!email || !password || email==='' | password=== ''){
        next(errorHandler(400, 'All fields are required.'));
    };
    try {
        const validUser= await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, 'email not found'));
        }
        const validPassword= bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, 'Password incorrect.'));
        };
        const token= jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const {password: pass, ...rest}= validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly:true
        }).json(rest);

    } catch (error) {
        next(error);
    }
};
