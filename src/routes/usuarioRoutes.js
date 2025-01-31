import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import authMiddleware from "../middleware/autenticado.js";

const routes = express.Router();

routes.post("/usuarios", authMiddleware, UsuarioController.cadastrar);
routes.get("/usuarios", UsuarioController.buscarTodosUsuarios);
routes.get("/usuarios/id/:id", UsuarioController.buscarUsuarioPorId);
routes.put("/usuarios/id/:id", authMiddleware, UsuarioController.editarUsuario);
routes.delete("/usuarios/id/:id", authMiddleware, UsuarioController.deletarUsuario);

export default routes;
