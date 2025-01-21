import mongoose, { mongo } from "mongoose";

async function conectaNaDatabse() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
};

export default conectaNaDatabse;

