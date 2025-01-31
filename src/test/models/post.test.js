import { describe, expect, it, jest } from '@jest/globals';
import PostController from '../../controllers/postController.js';
import post from '../../models/Post.js';
import { autor } from '../../models/Autor.js';

// Mock das models
jest.mock('../../models/Post.js');
jest.mock('../../models/Autor.js');

describe('Testando o PostController', () => {
    const mockRequest = (data = {}, params = {}) => ({ body: data, params });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve listar todos os posts', async () => {
        const postsMock = [
            { titulo: "Post 1", conteudo: "Conteúdo 1" },
            { titulo: "Post 2", conteudo: "Conteúdo 2" },
        ];
        post.find.mockResolvedValue(postsMock);

        const req = mockRequest();
        const res = mockResponse();

        await PostController.listarPosts(req, res);

        expect(post.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(postsMock);
    });

    it('Deve listar um post pelo ID', async () => {
        const postMock = { titulo: "Post 1", conteudo: "Conteúdo 1" };
        post.findById.mockResolvedValue(postMock);

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await PostController.listarPostPorId(req, res);

        expect(post.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(postMock);
    });

    it('Deve criar um novo post', async () => {
        const novoPost = {
            titulo: "Novo Post",
            conteudo: "Conteúdo do post",
            autor: "1234567890abcdef12345678"
        };

        const autorMock = {
            _id: "1234567890abcdef12345678",
            nome: "Autor Teste",
            email: "autor@email.com",
            _doc: {
                _id: "1234567890abcdef12345678",
                nome: "Autor Teste",
                email: "autor@email.com"
            }
        };

        autor.findById.mockResolvedValue(autorMock);
        post.create.mockResolvedValue({
            ...novoPost,
            autor: autorMock._doc,
        });

        const req = mockRequest(novoPost);
        const res = mockResponse();

        await PostController.criarPost(req, res);

        expect(autor.findById).toHaveBeenCalledWith("1234567890abcdef12345678");
        expect(post.create).toHaveBeenCalledWith({
            ...novoPost,
            autor: autorMock._doc,
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Post criado com sucesso!",
<<<<<<< HEAD
            post: novoPost,
        });
    });

=======
            post: {
                ...novoPost,
                autor: autorMock._doc,
            },
        });
    });


>>>>>>> 68f4fe5 (Melhorias e refatoração de código)
    it('Deve atualizar um post pelo ID', async () => {
        post.findByIdAndUpdate.mockResolvedValue();

        const req = mockRequest({ titulo: "Post Atualizado" }, { id: '123' });
        const res = mockResponse();

        await PostController.atualizarPost(req, res);

        expect(post.findByIdAndUpdate).toHaveBeenCalledWith('123', { titulo: "Post Atualizado" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Post atualizado com sucesso!",
        });
    });

    it('Deve excluir um post pelo ID', async () => {
        post.findByIdAndDelete.mockResolvedValue();

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await PostController.excluirPost(req, res);

        expect(post.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Post excluído com sucesso!",
        });
    });

    it('Deve buscar posts por palavra-chave', async () => {
        const postsMock = [
            { titulo: "Post Teste", conteudo: "Conteúdo do teste" },
        ];
        post.find.mockResolvedValue(postsMock);

        const req = mockRequest({}, { keyword: "Teste" });
        const res = mockResponse();

        await PostController.buscarPostPorPalavraChave(req, res);

        expect(post.find).toHaveBeenCalledWith({
            $or: [
                { titulo: { $regex: "Teste", $options: "i" } },
                { conteudo: { $regex: "Teste", $options: "i" } },
            ],
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(postsMock);
    });

    it('Deve retornar erro ao buscar posts sem palavra-chave', async () => {
        const req = mockRequest({}, {});
        const res = mockResponse();

        await PostController.buscarPostPorPalavraChave(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "A palavra-chave é obrigatória.",
        });
    });
});

