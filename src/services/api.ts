import axios from 'axios';

export let token = localStorage.getItem("token")?.replace(/"/g, "");
export let tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export let role = localStorage.getItem("roles")?.replace(/"/g, "");
export let id = localStorage.getItem("id")?.replace(/"/g, "");
export let idPessoa = localStorage.getItem("idPessoa")?.replace(/"/g, "");
export let status = localStorage.getItem("status")?.replace(/"/g, "");
export let Email = localStorage.getItem("email")?.replace(/"/g, "");
export const semImagem = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.png/1024px-Item_sem_imagem.png.png"
export let ip = "http://localhost";//teste local
//export let ip = "https://projetos.42dias.com.br";//servidor teste
// export let ip = "http://constalshop.com.br";

export const api = axios.create({
  baseURL: ip+':8157/api/tenant/'+tenantId +"/",
  // baseURL: ''+ip+':8157/api/tenant/'+tenantId || "fa22705e-cf27-41d0-bebf-9a6ab52948c4" +"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});


export const apiWithoutToken = axios.create({
  baseURL: ip+':8157/api/tenant/'+tenantId +"/",
  // baseURL: ''+ip+':8157/api/tenant/'+tenantId || "fa22705e-cf27-41d0-bebf-9a6ab52948c4" +"/",
  timeout: 50000,
  // headers: {'Authorization': 'Bearer '+ token}
});

