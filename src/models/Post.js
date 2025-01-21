import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const postSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    //autor: { type: String, required: true }
    autor: autorSchema, //embedding 
    //autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true} //referencing
}, { versionKey: false });

const post = mongoose.model("posts", postSchema);

export default post;