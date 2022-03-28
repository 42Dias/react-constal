import { formatPrice } from "./format";

export default function makeSumToFornecedorOfPeso(fornecedor){
    const total =  fornecedor.produtos.reduce((sumTotal, produto) => {
        sumTotal += Number(produto.produto.pesoLiq) * produto.quantidade;
        return sumTotal;
        }, 0)
    
    return total
}
