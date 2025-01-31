import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

export default async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Access token não informado!");
    }

    const [, acessToken] = token.split(" ");

    try {

        jwt.verify(acessToken, jsonSecret.secret);

        const { id, email } = jwt.decode(acessToken);

        req.usuarioId = id;
        req.usuarioEmail = email;

        return next();
    } catch (error) {
        res.status(401).send("Usuário não autorizado!")
    }
}