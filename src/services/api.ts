import axios from 'axios';

let token = localStorage.getItem("token")?.replace(/"/g, "");
let tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export const api = axios.create({
  baseURL: 'http://localhost:8157/api/tenant/'+tenantId+"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});
