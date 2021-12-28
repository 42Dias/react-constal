import axios from 'axios';

export let token = localStorage.getItem("token")?.replace(/"/g, "");
export let tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export let role = localStorage.getItem("roles")?.replace(/"/g, "");
export let id = localStorage.getItem("id")?.replace(/"/g, "");
export let idPessoa = localStorage.getItem("idPessoa")?.replace(/"/g, "");
export let status = localStorage.getItem("status")?.replace(/"/g, "");
export let Email = localStorage.getItem("email")?.replace(/"/g, "");
export const semImagem = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/1024px-Item_sem_imagem.svg.png"
//export let ip = "localhost";//teste local
export let ip = "7dd208931cad.sn.mynetname.net/";//servidor

export const api = axios.create({
  baseURL: 'http://'+ip+':8157/api/tenant/'+tenantId+"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});

