import express from "express";

import posts from "./postsRoutes.js";
import autores from "./autorRoutes.js";
import usuarios from "./usuarioRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("API EduConnect - Express com Node.js"));

  app.use(express.json());

  app.use(auth);

  app.use(posts);
  app.use(autores);
  app.use(usuarios);
};

export default routes;
