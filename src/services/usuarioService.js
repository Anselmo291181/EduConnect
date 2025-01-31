import bcryptjs from "bcryptjs";
import { Usuario } from "../models/Usuario.js";

const { hash } = bcryptjs;

class UsuarioService {
    async cadastrar(dto) {

        const usuarioExistente = await Usuario.findOne({ email: dto.email });

        if (usuarioExistente) {
            throw new Error("Usuário já cadastrado!");
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = await Usuario.create({
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
            });

            return novoUsuario;

        } catch (error) {
            throw new Error("Erro ao cadastrar usuário");
        }
    }

    async buscarTodosUsuarios() {
        return await Usuario.find();
    }
    async buscarUsuarioPorId(id) {
        const usuario = await Usuario.findOne({ _id: id });

        if (!usuario) {
            throw new Error("Usuário informado não cadastrado!");
        }

        return usuario;
    }
    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id);

        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;

            await usuario.save();

            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }
    }
    async deletarUsuario(id) {
        const usuario = await this.buscarUsuarioPorId(id);

        try {
            await usuario.deleteOne({ _id: id });
        } catch (error) {
            throw new Error('Erro ao deletar usuario!')
        }
    }
}

export default UsuarioService;
