import express from "express";
import PostController from "../controllers/postController.js";
import authMiddleware from "../middleware/autenticado.js";

const routes = express.Router();

routes.get("/posts", PostController.listarPosts);
routes.get("/posts/search/:keyword", PostController.buscarPostPorPalavraChave);
routes.get("/posts/:id", PostController.listarPostPorId);
routes.post("/posts", authMiddleware, PostController.criarPost);
routes.put("/posts/:id", authMiddleware, PostController.atualizarPost);
routes.delete("/posts/:id", authMiddleware, PostController.excluirPost);

export default routes;