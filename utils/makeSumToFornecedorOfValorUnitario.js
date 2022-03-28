import { formatPrice } from "./format";

export default function makeSumToFornecedorOfValorUnitario(fornecedor){
    const total =  fornecedor.produtos.reduce((sumTotal, produto) => {
        sumTotal += Number(produto.produto.preco) 
        return sumTotal;
        }, 0)
    
    return total
}
