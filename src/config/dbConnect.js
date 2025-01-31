import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function conectaNaDatabse() {
    mongoose.connect(process.env.MONGODB_URI);
    
    return mongoose.connection;
};

export default conectaNaDatabse;
