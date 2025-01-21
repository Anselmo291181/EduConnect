import express from "express";
import PostController from "../controllers/postController.js";

const routes = express.Router();

routes.get("/posts", PostController.listarPosts);
routes.get("/posts/search/:keyword", PostController.buscarPostPorPalavraChave);
routes.get("/posts/:id", PostController.listarPostPorId);
routes.post("/posts", PostController.criarPost);
routes.put("/posts/:id", PostController.atualizarPost);
routes.delete("/posts/:id", PostController.excluirPost);

export default routes;