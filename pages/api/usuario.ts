import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import { validarTokenJWT } from '../../middleware/validateToken'
import { UsuarioModel } from '../../models/UsuarioModel';
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';


const usuarioEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
    // id do usuario

    try {
        const { userId } = req.query;
        const usuario = await UsuarioModel.findById(userId);
        usuario.senha = null;
        return res.status(200).json(usuario)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Não foi possivel obter dados do usuario' })
    }
}



export default validarTokenJWT(connectMongoDB(usuarioEndpoint));