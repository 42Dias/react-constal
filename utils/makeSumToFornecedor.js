import { formatPrice } from "./format";

export default function makeSumToFornecedor(fornecedor){
    const total =  fornecedor.produtos.reduce((sumTotal, produto) => {
        sumTotal += Number(produto.produto.preco) * produto.quantidade;
        return sumTotal;
        }, 0)
    
    return total
}
