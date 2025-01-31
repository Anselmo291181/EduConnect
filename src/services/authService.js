import { Usuario } from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

const { compare } = bcryptjs;

class AuthService {
    async login(dto) {
        try {
            const usuario = await Usuario.findOne({
                email: dto.email,
            }).select("id email senha");

            if (!usuario) {
                throw new Error("Usuário não cadastrado!");
            }

            const senhasIguais = await compare(dto.senha, usuario.senha);

            if (!senhasIguais) {
                throw new Error("Usuário ou senha inválido!");
            }

            const acessToken = jwt.sign({
                id: usuario.id,
                email: usuario.email
            }, jsonSecret.secret, {
                expiresIn: 86400
            });

            return { acessToken };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default AuthService;