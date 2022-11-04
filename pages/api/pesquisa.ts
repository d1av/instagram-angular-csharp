import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { validarTokenJWT } from '../../middleware/validateToken';
import { uploadImagemCosmic, upload } from '../../services/uploadImagemCosmic';
import { PublicacaoModel } from '../../models/PublicacaoModel'
import { UsuarioModel } from '../../models/UsuarioModel'

const pesquisaEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | Array<String>>) => {
    try {
        if (req.method === 'GET') {
            const { filtro } = req.query;

            if (!filtro || filtro.length < 2) {
                return res.status(400).json({ error: 'Favor informar pelo menos mais que dois caracteres.' })
            }

            const usuariosEncontrados = await UsuarioModel.find({
             //ve por nome ou email
                $or: [
                    { nome: { $regex: filtro, $options: 'i' } },
                    { email: { $regex: filtro, $options: 'i' } },
                ]
            })
            return res.status(200).json(usuariosEncontrados)

        }
        return res.status(405).json({ error: 'Metodo informado não é válido' })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ msg: 'A pesquisa não pode ser concluída.' })
    }


}

export default validarTokenJWT(connectMongoDB(pesquisaEndpoint));