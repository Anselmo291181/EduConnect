import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao listar autores`,
            });
        }
    }

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao listar autor`,
            });
        }
    }

    static async criarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: "Autor criado com sucesso!",
                autor: novoAutor
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao criar autor`,
            });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Autor atualizado com sucesso!",
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao atualizar autor`,
            });
        }
    }

    static async excluirAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({
                message: "Autor excluído com sucesso!",
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao excluir autor`,
            });
        }
    }

    static async listarAutorPorNome(req, res) {
        try {
            const { name } = req.params;
            if (!name) {
                return res.status(400).json({
                    message: "Informe o nome do autor.",
                });
            }
            const result = await autor.find({
                nome: { $regex: name, $options: "i" }
            });

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Nenhum autor encontrado com o nome informado.",
                });
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao buscar autor por nome`,
            });
        }
    }

};

export default AutorController;