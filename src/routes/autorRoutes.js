import express from "express";
import AutorController from "../controllers/autorController.js";
import authMiddleware from "../middleware/autenticado.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/search/:name", AutorController.listarAutorPorNome);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", authMiddleware, AutorController.criarAutor);
routes.put("/autores/:id", authMiddleware, AutorController.atualizarAutor);
routes.delete("/autores/:id", authMiddleware, AutorController.excluirAutor);

export default routes;