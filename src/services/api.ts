import axios from 'axios';

let token = localStorage.getItem("token")?.replace(/"/g, "");
let tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export const api = axios.create({
  baseURL: 'http://189.127.14.11:8157/api/tenant/'+tenantId+"/",

  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});
