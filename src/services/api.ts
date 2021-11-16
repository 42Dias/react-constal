import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://dev.42dias.com.br/Clientes/constal/APIS',
});
