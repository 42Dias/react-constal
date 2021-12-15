export interface Product {
  categoria: any;
  frete: any;
  prazo: string;
  imagem: any;
  caracteristicasTecnicas:string;
  codigoDaEmpresa:string;
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  publicUrl: string;
  isOferta: number;
  precoOferta: any;
  quantidade: number;
  status: string;
  empresaId: string;
  fotos: {
    publicUrl: string;
  }
 
  produto: {
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

export interface Empresa {
  avatars: string;
  telefone: string;
  email: string;
  roles: any;
  id: number;
  razaoSocial: string;
  cnpj: string;
}
