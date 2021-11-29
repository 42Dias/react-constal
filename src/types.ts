export interface Product {
  id: number;
  /*nome: string;
  descricao: string;
  preco: number;
  publicUrl: string;
  isOferta: number;
  precoOferta: any;*/
  quantidade: number;
  produto:{
    id: number;
    nome: string;
    fotos: string;
    preco: number;
  }
}

export interface Stock {
  id: number;
  quantidade: number;
}
