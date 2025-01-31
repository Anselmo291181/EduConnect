import express from "express";
import AutorController from "../controllers/autorController.js";
<<<<<<< HEAD
=======
import authMiddleware from "../middleware/autenticado.js";
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/search/:name", AutorController.listarAutorPorNome);
routes.get("/autores/:id", AutorController.listarAutorPorId);
<<<<<<< HEAD
routes.post("/autores", AutorController.criarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.excluirAutor);
=======
routes.post("/autores", authMiddleware, AutorController.criarAutor);
routes.put("/autores/:id", authMiddleware, AutorController.atualizarAutor);
routes.delete("/autores/:id", authMiddleware, AutorController.excluirAutor);
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)

export default routes;