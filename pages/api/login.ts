import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from '../../middleware/connectDB'
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import bcrypt from 'bcrypt';
import { UsuarioModel } from "../../models/UsuarioModel";

const endpointLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body;

    //buscar banco email, e compara senha se existir usuário no banco
    const buscarUsuario = await UsuarioModel.find({ email: login });

    if (await bcrypt.compare(senha, buscarUsuario[0].senha)) {
      return res.status(200).json({ msg: `Usuário ${buscarUsuario[0].nome} logado com sucesso.` })
    }
    return res.status(405).json({ error: 'Usuário ou senha não encontrado.' })
  }
  return res.status(405).json({ error: 'Metodo informado não é valido' });
}

export default connectMongoDB(endpointLogin);