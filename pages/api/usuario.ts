import {NextApiRequest,NextApiResponse} from 'next'
import { validarTokenJWT } from '../../middleware/validateToken'


const usuarioEndpoint = (req:NextApiRequest, res: NextApiResponse)=>{
    return res.status(200).json('Usuário autenticado com sucesso.')
}

export default validarTokenJWT(usuarioEndpoint);