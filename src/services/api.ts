import axios from 'axios';

export const token = localStorage.getItem("token")?.replace(/"/g, "");
export const tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export const role = localStorage.getItem("roles")?.replace(/"/g, "");
export const id = localStorage.getItem("id")?.replace(/"/g, "");
export const idPessoa = localStorage.getItem("idPessoa")?.replace(/"/g, "");
export const status = localStorage.getItem("status")?.replace(/"/g, "");
export const Email = localStorage.getItem("email")?.replace(/"/g, "");
export const ip = "189.127.14.11";

export const api = axios.create({
  baseURL: 'http://'+ip+':8157/api/tenant/'+tenantId+"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});

