import type { NextApiRequest, NextApiResponse } from 'next'
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { CadastroRequisicao } from '../../types/CadastroRequisicao'

const endpointCadastro = (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
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

        return res.status(200).json({ msg: 'usuário criado com sucesso.' })
    }
    return res.status(405).json({ error: 'Método informado não é valido.' })
}

export default endpointCadastro;