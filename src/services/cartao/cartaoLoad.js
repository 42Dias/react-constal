import { api, apiWithoutTenant, apiWithTenantAndWithToken } from "../api";



export default async function cartaoLoad(){
    return await apiWithoutTenant.get(`cartao`)
          .then((response) => {
            let cartaoData = response.data.rows
            console.log(cartaoData)
            return cartaoData
          });
}
