import type { NextApiRequest, NextApiResponse } from 'next'
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { CadastroRequisicao } from '../../types/CadastroRequisicao'
import { connectMongoDB } from '../../middleware/connectDB'
import { UsuarioModel } from '../../models/UsuarioModel'
import bcrypt from 'bcrypt';

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    if (req.method === 'POST') {
        // typescript type, new bonus mega cool
        const usuario = req.body as CadastroRequisicao;

        if (!usuario.nome || usuario.nome.length < 2) {
            return res.status(400).json({ error: 'Nome invalido' });
        }
        if (!usuario.email
            || usuario.email.length < 5
            || !usuario.email.includes('@')
            || !usuario.email.includes('.')) {
            return res.status(405).json({ error: 'Email informado não é valido.' })
        }

        if (!usuario.senha || usuario.senha.length < 4) {
            return res.status(400).json({ error: 'Senha Inválida.' })
        }

        // validar se ja tem um usuarui
        const usuariosComMesmoEmail = await UsuarioModel.find({ email: usuario.email });
        if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0) {
            return res.status(200).json({ error: 'Já existe uma conta com email informado.' })
        }

        //salvar no banco de dado
        const senhaEncrypt = await bcrypt.hash(usuario.senha, 10);

        const dbSave = await UsuarioModel.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: senhaEncrypt
        });

        return res.status(200).json({
            msg: "usuário criado com sucesso.",
            nome: dbSave.nome,
            email: dbSave.email
        })
    }
    return res.status(405).json({ error: 'Método informado não é valido.' })
}

export default connectMongoDB(endpointCadastro);