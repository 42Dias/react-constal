import { createContext, useState, useEffect, useContext } from "react";
import { id, token } from "../services/api";
import cartaoDelete from "../services/cartao/cartaoDelete";
import cartaoLoadFilter from "../services/cartao/cartaoLoadFilter";
import CreditCardService from "../services/CreditCardService";

export const CreditCardContext = createContext({});

export default function CreditCardProvider({ children }) {
  
  const [creditCardList, setCreditCardList] = useState([]);

  async function getCreditCards(){
    try {
      if(!token) return;

      let response = await cartaoLoadFilter('user', id)
      setCreditCardList(response);
      return response
    } catch (error) {
      console.log(error);
    }
  };

  async function addCreditCard(data){
    try {
      const response = await CreditCardService.createCreditCard(data);
      console.log(response);

      //TODO - exibir a lista de carões atualizada depois de adiocionar um novo cartão
      //   setCreditCardList(response.data);

      getCreditCards()

      
    }
    
    catch (error) {
      console.log(error);
    }
  };

  async function deleteCreditCart(id){
    await cartaoDelete(id)

    getCreditCards()
  }

  useEffect(() => {
    getCreditCards();
  }, []);

  return (
    <CreditCardContext.Provider
      value={{ getCreditCards, creditCardList, addCreditCard, deleteCreditCart }}
    >
      {children}
    </CreditCardContext.Provider>
  );
}

export function useCreditCard() {
  const context = useContext(CreditCardContext);
  const { getCreditCards, creditCardList, addCreditCard, deleteCreditCart } = context;

  return { getCreditCards, creditCardList, addCreditCard, deleteCreditCart };
}
