import express from "express";
import posts from "./postsRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Express com Node.js"));

    app.use(express.json(), posts, autores);
};

export default routes;