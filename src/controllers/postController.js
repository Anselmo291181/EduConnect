import post from "../models/Post.js";
import { autor } from "../models/Autor.js";

class PostController {

<<<<<<< HEAD
=======
    static async criarPost(req, res) {
        const novoPost = req.body;
        try {
            const autorEncontrado = await autor.findById(novoPost.autor);
            const postCompleto = {
                ...novoPost,
                autor: { ...autorEncontrado._doc }
            }
            
            const postCriado = await post.create(postCompleto);
            res.status(201).json({
                message: "Post criado com sucesso!",
                post: postCriado
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao criar post`,
            });
        }
    }

>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
    static async listarPosts(req, res) {
        try {
            const listaPosts = await post.find({});
            res.status(200).json(listaPosts);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao listar posts`,
            });
        }
    }

    static async listarPostPorId(req, res) {
        try {
            const id = req.params.id;
            const postEncontrado = await post.findById(id);
            res.status(200).json(postEncontrado);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao listar post`,
            });
        }
    }

<<<<<<< HEAD
    static async criarPost(req, res) {
        const novoPost = req.body;
        try {
            const autorEncontrado = await autor.findById(novoPost.autor);
            const postCompleto = {
                ...novoPost,
                autor: { ...autorEncontrado._doc }
            }
            const postCriado = await post.create(postCompleto);
            res.status(201).json({
                message: "Post criado com sucesso!",
                post: novoPost
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao criar post`,
            });
        }
    }

=======
>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
    static async atualizarPost(req, res) {
        try {
            const id = req.params.id;
            await post.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Post atualizado com sucesso!",
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao atualizar post`,
            });
        }
    }

    static async excluirPost(req, res) {
        try {
            const id = req.params.id;
            await post.findByIdAndDelete(id);
            res.status(200).json({
                message: "Post excluído com sucesso!",
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao excluir post`,
            });
        }
    }

    static async buscarPostPorPalavraChave(req, res) {
        try {
            const { keyword } = req.params;

            if (!keyword) {
                return res.status(400).json({
                    message: "A palavra-chave é obrigatória.",
                });
            }

            const resultados = await post.find({
                $or: [
                    { titulo: { $regex: keyword, $options: "i" } },
                    { conteudo: { $regex: keyword, $options: "i" } }
                ]
            });

            if (resultados.length === 0) {
                return res.status(404).json({
                    message: "Nenhum post encontrado com a palavra-chave informada.",
                });
            }

            res.status(200).json(resultados);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - falha ao buscar posts por palavra-chave`,
            });
        }
    }

};

export default PostController;