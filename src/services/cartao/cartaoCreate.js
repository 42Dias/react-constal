/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function cartaoCreate(data) {
    return api.post('cartao', {
      data
      })
      .then((response) => {
        let mensagemOk = 'Recebemos seu cartao :)'
        let mensagemNaoOK = 'Revise os dados do cartao :('
        responseHandler(response.status, mensagemOk, mensagemNaoOK)

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }