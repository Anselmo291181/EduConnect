import mongoose, { mongo } from "mongoose";
<<<<<<< HEAD

async function conectaNaDatabse() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

=======
import dotenv from 'dotenv';

dotenv.config();

async function conectaNaDatabse() {
    mongoose.connect(process.env.MONGODB_URI);
    
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
    return mongoose.connection;
};

export default conectaNaDatabse;
<<<<<<< HEAD

=======
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
