import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import { validarTokenJWT } from '../../middleware/validateToken'
import { PublicacaoModel } from '../../models/PublicacaoModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';

const feedEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg|any>) => {
    try {
        if (req.method === "GET") {
            // receber uma informacao do id do usuario
            const { userId } = req.query;
            if(!userId){
                // id do usuario
                return res.status(400).json({ error: 'Usuario não é valido' });
            }
            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) {
                return res.status(400).json({ error: 'Usuario não é valido' });
            }
            const publicacoes = await PublicacaoModel.find({ idUsuario: usuario._id })
                .sort({ data: -1 });

            return res.status(200).json(publicacoes);
            // buscar do feed
            // onde vme informacao
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'não foi possivel obter o feed' })
    }
}

export default validarTokenJWT(connectMongoDB(feedEndpoint));