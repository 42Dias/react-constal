import { api, apiWithoutTenant, apiWithTenantAndWithToken } from "../api";



export default async function cartaoLoadFilter(filter, value){
  try{
    return await api.get(`cartao?filter%5B${filter}%5D=${value}`)
          .then((response) => {
            let cartaoData = response.data.rows
            return cartaoData
          });
  }
  catch(e){
    console.error(e)
  }
}
