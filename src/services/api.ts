import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://react-constal.vercel.app/',
});
