import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function cartaoDelete(cartaoId){
    return await api.delete(`cartao/${cartaoId}`,{
      params:{
        id: cartaoId,
      }
    })
    .then(
      ( {data, status} ) => {
            if(status != 200) toast.error("Algo deu errado! :(")
            toast.success("Excluido com sucesso!")
            return data
          }
      );
}
