import express from "express";
import PostController from "../controllers/postController.js";
<<<<<<< HEAD
=======
import authMiddleware from "../middleware/autenticado.js";
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)

const routes = express.Router();

routes.get("/posts", PostController.listarPosts);
routes.get("/posts/search/:keyword", PostController.buscarPostPorPalavraChave);
routes.get("/posts/:id", PostController.listarPostPorId);
<<<<<<< HEAD
routes.post("/posts", PostController.criarPost);
routes.put("/posts/:id", PostController.atualizarPost);
routes.delete("/posts/:id", PostController.excluirPost);
=======
routes.post("/posts", authMiddleware, PostController.criarPost);
routes.put("/posts/:id", authMiddleware, PostController.atualizarPost);
routes.delete("/posts/:id", authMiddleware, PostController.excluirPost);
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)

export default routes;