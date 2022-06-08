// import { api } from '../api'

import axios from 'axios';
import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler'


export default class integration {
  static async create(data) {


    const url = 'https://api.zsystems.com.br/';
    const hash = 'f3bd8a2cabbeee52713c35f4bcc00775035a9635'

    const api = axios.create({
        baseURL: url,
        timeout: 50000,
        headers: {
            'Authorization': 'Bearer '+ hash,
            'Content-Type': 'multipart/form-data',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
          }
      });


      let res = await api
        .post('estabelecimentos', data)
        .then(r => r.data)
        .catch(function (error) {
          console.log(error)

          toast.error("Erro ao criar seus dados no gateway de pagamento, revise-os!")
          
          throw error              
        });

      const status = res.success 

      let statusCode;

      status == true ? statusCode = 200 : statusCode = 400;


      const mensagemOk = 'Área alterado com sucesso!'
      const mensagemNaoOK = res.error

      responseHandler(statusCode, mensagemOk, mensagemNaoOK)

      console.log(res.error)

      console.log( " res " )
      console.log(   res  )

      console.log("status")
      console.log(status)

      return res
      }
}
