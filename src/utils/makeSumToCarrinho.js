import { formatPrice } from "./format";

export default function makeSumToCarrinho(carrinhos){
    const total = carrinhos.reduce((sumTotal, { produto, quantidade }) => {
        let precoFormatado =  parseFloat(produto.preco) 
        sumTotal += precoFormatado * quantidade

        return sumTotal;
    }, 0)
    return total
}
