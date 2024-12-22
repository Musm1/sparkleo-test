import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app= express();

dotenv.config();

const corsOption={
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB is successfully connected.");
})
.catch((err)=>{
    console.log(err)
});

const port= 5000;

app.use(cors(corsOption));


app.use(express.json());
app.use(cookieParser());

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.`); 
});

app.use('/api/auth', authRoutes);

//middleware
app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500;
    const message= err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});