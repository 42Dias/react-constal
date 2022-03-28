import { formatPrice } from "./format";

export default function makeSumToFornecedorOfQuantidade(fornecedor){
    const total =  fornecedor.produtos.reduce((sumTotal, produto) => {
        sumTotal +=  produto.quantidade // * Number(produto.produto.quantidade) ;
        return sumTotal;
        }, 0)
    
    return total
}
