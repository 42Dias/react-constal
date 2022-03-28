import { ApiService } from "../services/ApiService";
import cartaoCreate from '../services/cartao/cartaoCreate'
class CreditCardService {
  async createCreditCard(data) {
    try {
      // const response = await ApiService.post("/credit-card", data);
      const response = await cartaoCreate(data)
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAllCreditCards(userId) {
    try {
      const response = await ApiService.get(`/credit-card/${userId}`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new CreditCardService();
