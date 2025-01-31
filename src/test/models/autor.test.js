import { describe, expect, it, jest } from '@jest/globals';
import AutorController from '../../controllers/autorController.js';
import { autor as Autor } from '../../models/Autor.js';

// Mock da model Autor
jest.mock('../../models/Autor.js');

describe('Testando o AutorController', () => {
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

    it('Deve listar todos os autores', async () => {
        const autoresMock = [
            { nome: "Autor 1", email: "autor1@email.com" },
            { nome: "Autor 2", email: "autor2@email.com" },
        ];
        Autor.find.mockResolvedValue(autoresMock);

        const req = mockRequest();
        const res = mockResponse();

        await AutorController.listarAutores(req, res);

        expect(Autor.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(autoresMock);
    });

    it('Deve listar um autor pelo ID', async () => {
        const autorMock = { nome: "Autor 1", email: "autor1@email.com" };
        Autor.findById.mockResolvedValue(autorMock);

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await AutorController.listarAutorPorId(req, res);

        expect(Autor.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(autorMock);
    });

    it('Deve criar um novo autor', async () => {
        const novoAutor = { nome: "Autor Teste", email: "teste@email.com" };
        Autor.create.mockResolvedValue(novoAutor);

        const req = mockRequest(novoAutor);
        const res = mockResponse();

        await AutorController.criarAutor(req, res);

        expect(Autor.create).toHaveBeenCalledWith(novoAutor);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Autor criado com sucesso!",
            autor: novoAutor,
        });
    });

    it('Deve atualizar um autor pelo ID', async () => {
        Autor.findByIdAndUpdate.mockResolvedValue();

        const req = mockRequest({ nome: "Autor Atualizado" }, { id: '123' });
        const res = mockResponse();

        await AutorController.atualizarAutor(req, res);

        expect(Autor.findByIdAndUpdate).toHaveBeenCalledWith('123', { nome: "Autor Atualizado" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Autor atualizado com sucesso!",
        });
    });

    it('Deve excluir um autor pelo ID', async () => {
        Autor.findByIdAndDelete.mockResolvedValue();

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await AutorController.excluirAutor(req, res);

        expect(Autor.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Autor excluído com sucesso!",
        });
    });

    it('Deve listar autores por nome', async () => {
        const autoresMock = [
            { nome: "Autor Teste", email: "teste@email.com" },
        ];
        Autor.find.mockResolvedValue(autoresMock);

        const req = mockRequest({}, { name: 'Teste' });
        const res = mockResponse();

        await AutorController.listarAutorPorNome(req, res);

        expect(Autor.find).toHaveBeenCalledWith({ nome: { $regex: 'Teste', $options: 'i' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(autoresMock);
    });

    it('Deve retornar erro ao buscar autores por nome sem informar o nome', async () => {
        const req = mockRequest({}, {});
        const res = mockResponse();

        await AutorController.listarAutorPorNome(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Informe o nome do autor.",
        });
    });
});
