import { formatPrice } from "./format";

export default function makeSumToFornecedorOfCubagem(fornecedor){
    const total =  fornecedor.produtos.reduce((sumTotal, produto) => {
        sumTotal += Number(produto.produto.cubagemEmbalagem) * produto.quantidade;
        return sumTotal;
        }, 0)
    
    return total
}
