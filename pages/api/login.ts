import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectMongoDB } from '../../middleware/connectDB'
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { UsuarioModel } from "../../models/UsuarioModel";
import { LoginResposta } from "../../types/LoginResposta";

const endpointLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg | LoginResposta>
) => {

  const { JWT_KEY } = process.env;
  if (!JWT_KEY) {
    res.status(500).json({ error: 'ENV JWT não informado.' })
  }


  if (req.method === 'POST') {
    const { login, senha } = req.body;

    //buscar banco email, e compara senha se existir usuário no banco
    const buscarUsuario = await UsuarioModel.find({ email: login });

    if (await bcrypt.compare(senha, buscarUsuario[0].senha)) {
      const usuarioLogado = buscarUsuario[0];

      const token = jwt.sign({ _id: usuarioLogado._id }, JWT_KEY!);

      return res.status(200).json({
        name: usuarioLogado.nome,
        email: usuarioLogado.email,
        token
      })
    }
    return res.status(405).json({ error: 'Usuário ou senha não encontrado.' })
  }
  return res.status(405).json({ error: 'Metodo informado não é valido' });
}

export default connectMongoDB(endpointLogin);