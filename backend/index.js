import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app= express();
const port= 5000;
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB is successfully connected.");
})
.catch((err)=>{
    console.log(err)
});

//middlewares
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.`); 
});
