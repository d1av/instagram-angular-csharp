import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from '../../middleware/connectDB'
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'

const endpointLogin = (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body;

    if ((login === 'admin@admin.com') && (senha === 'admin123')) {
      return res.status(200).json({ msg: "Usuário logado com sucesso." })
    }
    return res.status(405).json({ error: 'Usuário ou senha não encontrado.' })
  }
  return res.status(405).json({ error: 'Metodo informado não é valido' });
}

export default connectMongoDB(endpointLogin);