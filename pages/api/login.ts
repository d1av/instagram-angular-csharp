import { NextApiRequest, NextApiResponse } from "next";

export default function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST'){
    const {login,senha} = req.body;

    if((login==='admin@admin.com')&&(senha==='admin123')){
      res.status(200).json({msg: "Usuário logado com sucesso."})
    }
    return res.status(405).json({erro: 'Usuário ou senha não encontrado.'})
  }
  return res.status(405).json({erro: 'Metodo informado não é valido'});
}