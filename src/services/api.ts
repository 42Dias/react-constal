import axios from 'axios';

export const token = localStorage.getItem("token")?.replace(/"/g, "");
export const tenantId = localStorage.getItem("tenantId")?.replace(/"/g, "");
export const role = localStorage.getItem("roles")?.replace(/"/g, "");
export const id = localStorage.getItem("id")?.replace(/"/g, "");
export const idPessoa = localStorage.getItem("idPessoa")?.replace(/"/g, "");
export const status = localStorage.getItem("status")?.replace(/"/g, "");
export const Email = localStorage.getItem("email")?.replace(/"/g, "");

export const getToken = () => {
  const token = localStorage.getItem("token")?.replace(/"/g, "") 
  return token
}

export const semImagem = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.png/1024px-Item_sem_imagem.png.png"
// export const ip = "http://localhost"; //teste local
export const porta = "8157";
//export const ip = "https://projetos.42dias.com.br";//servidor teste
export const ip = "https://constalshop.com.br";//servidor

//export const ip =  "https://162.240.22.199"	

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

