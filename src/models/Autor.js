import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    email: { type: String, required: true },
<<<<<<< HEAD
    senha: { type: String, required: true }
=======
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
}, { versionKey: false });

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };