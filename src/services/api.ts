import axios from 'axios';

let token = localStorage.getItem("token")?.replace(/"/g, "");
export const api = axios.create({
  baseURL: 'http://localhost:8157/api/',
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});
