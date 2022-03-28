/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function cartaoUpdate(data, id) {
    return api.put(`cartao/${id}`, {
      data
      })
      .then((response) => {
        let mensagemOk = 'Seu cartao foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
        let mensagemNaoOK = 'Revise os dados do cartao :('
        responseHandler(response.status, mensagemOk, mensagemNaoOK)
        if (response.status == 200) {
          //first check the http response, returning the result to user
          return response.status
        }

      })
      // .catch(() => {
      //   servidorErrorMessage()
      // })
  }