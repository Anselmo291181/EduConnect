import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
  },
  {
    timestamps: true, // createdAt e updatedAt
    versionKey: false,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export { Usuario, usuarioSchema };
