import { describe, expect, it, jest } from '@jest/globals';
import UsuarioService from '../../services/usuarioService.js';
import { Usuario } from '../../models/Usuario.js';

// Mock da model Usuario
jest.mock('../../models/Usuario.js');

describe('Testando o UsuarioService', () => {
    const usuarioService = new UsuarioService();

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

    it('Deve retornar erro ao tentar editar um usuário que não existe', async () => {
        const dto = { id: '123', nome: 'Novo Nome', email: 'novoemail@example.com' };
        Usuario.findOne.mockResolvedValue(null);

        try {
            await usuarioService.editarUsuario(dto);
        } catch (e) {
            expect(e.message).toBe("Usuário informado não cadastrado!");
        }
    });

    it('Deve retornar erro ao tentar deletar um usuário que não existe', async () => {
        const id = '123';
        Usuario.findOne.mockResolvedValue(null);

        try {
            await usuarioService.deletarUsuario(id);
        } catch (e) {
            expect(e.message).toBe("Usuário informado não cadastrado!");
        }
    });

    it('Deve cadastrar um usuário com sucesso', async () => {
        const dto = { nome: 'Usuario Teste', email: 'teste@example.com', senha: 'senha123' };

        Usuario.findOne.mockResolvedValue(null);
        Usuario.create.mockResolvedValue({ ...dto, _id: '123' });

        const usuario = await usuarioService.cadastrar(dto);

        expect(usuario).toHaveProperty('_id');
        expect(usuario.nome).toBe(dto.nome);
        expect(usuario.email).toBe(dto.email);
    });

    it('Deve retornar erro ao tentar cadastrar um usuário com email já existente', async () => {
        const dto = { nome: 'Usuario Teste', email: 'teste@example.com', senha: 'senha123' };
        Usuario.findOne.mockResolvedValue({ _id: '123', ...dto });

        try {
            await usuarioService.cadastrar(dto);
        } catch (e) {
            expect(e.message).toBe("Usuário já cadastrado!");
        }
    });
});
