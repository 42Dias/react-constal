import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api, ip } from '../services/api';
import axios from 'axios';

let token = localStorage.getItem("token")?.replace(/"/g, "");


interface Product{
  preco: any;
  precoOferta: any;
  isOferta: boolean;
  quantidadeNoEstoque: number;
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  quantidade: number;
}


interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: string;
  quantidade: number;
}

interface CartContextData {
  cart: () => Promise<number>;
  addProduct:    (productId: string) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, quantidade }: UpdateProductAmount) => void;
}

const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";


const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const cart = async () =>{
      const allCart: any  = await api.get(`carrinho/`)
      console.log("allCart")
      console.log(allCart.data.count)
      // return allCart.data.rows.lenght;
      return allCart.data.count;
      }
      

  const addProduct = async (productId: string) => {
    console.log("productId")
    console.log(productId)

    const cartResponse = await api.get(`carrinho`)
    const cart = cartResponse.data.rows;

    console.log("cart");
    console.log(cart);



    const produtoNoCarrinho = cart.filter((cart: any) => {
      if(cart.produto.id == productId){
        console.log(cart)      
        return cart
      }

    })    
  
    const productAlreadyInCart = produtoNoCarrinho[0]  
    console.log("productAlreadyInCart")
    console.log(productAlreadyInCart)

    const productResponse = await api.get<Product>(`produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
    const  product  = productResponse.data;
    if(product.isOferta == true){
      product.preco = product.precoOferta
    }
    

    console.log("product")
    console.log(product)
    
    const  stock: number  = product.quantidadeNoEstoque;
    
    console.log("stock") 
    console.log(stock) 
    
    let somaDeItens: number = 0 

    /*
    Está é a quantidade de items em todo o carrinho
    */ 
    const quantidadeDeItemsNoCarrinho = () =>{
        cart.map((cart:any) =>
        somaDeItens += cart.quantidade
        )
        return somaDeItens
    }

    
    console.log("quantidadeDeItemsNoCarrinho")
    console.log(quantidadeDeItemsNoCarrinho())

    try {
      
      if(!productAlreadyInCart) {
      
        console.log("ARRIVA");
      

        console.log("product");
        console.log(product); 
        
        if(stock > 0) {

          const response = await axios({
              method: 'post',
              url: `http://${ip}:8157/api/tenant/${tenantId}/carrinho/`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },              
              timeout: 50000,
              data   : { product, quantidade: 1 }
            })              
          console.log(JSON.stringify( { product, quantidade: 1 }))


          
          /* para mudar a quantidade

          const response = await fetch(
            `http://localhost:8157/api/tenant/${tenantId}/carrinho/${cartId}`, {
              method: "PUT",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },
              body: JSON.stringify([{...product, quantidade: 1}])
          });
          */
          // const response = await api.get(`/tenant/${tenantId}/carrinho/${cartId}`);
          console.log("response")
          console.log(response)
          return;
        }
        else{
          console.log("Erro")
          toast.error("Quantidade solicitada fora do estoque :(")
        }
      }

      else if(productAlreadyInCart) {
        console.log("PRODUTO ESTÁ EN EL CARIÑO")
        const  stock: number  = product.quantidadeNoEstoque;
        console.log(productAlreadyInCart)
        if (stock > productAlreadyInCart.quantidade) {

        productAlreadyInCart.quantidade++;
          
          const response = await axios({
            method: 'put',
            url: `http://${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            },              
            timeout: 50000,
            data   : productAlreadyInCart
          })              
            console.log(JSON.stringify( productAlreadyInCart ))
            console.log(response)
          return;
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      }
      else{
        console.log("erro na quantidade do produto")
      }
    }  catch (e){
      console.log(e)
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = async (productId: string) => {

      console.log(productId)

      const cartResponse = await api.get(`carrinho/`)
      const cart = cartResponse.data.rows;
    
      console.log(cart)

      const produtoNoCarrinho = cart.filter((cart: any) => {
        if(cart.produto.id == productId){
          console.log(cart)      
          return cart
        }
      })    
    
      console.log(produtoNoCarrinho)

      const productAlreadyInCart = produtoNoCarrinho[0];
      console.log("productAlreadyInCart")
      console.log(productAlreadyInCart)


      console.log(productId)

      
    try {
      if(!productAlreadyInCart) {
        toast.error('Erro na remoção do produto');
        return
      }
  
      const response = await axios({
        method: 'delete',
        url: `http://${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },              
        timeout: 50000,
        data   : productAlreadyInCart
      })              

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };  

  const updateProductAmount = async (//apenas dar um post com a nova quantidade com o id do carrinho
    {
    productId,
    quantidade,
  }: UpdateProductAmount) => {
    try {
      if(quantidade < 1){
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const cartResponse = await api.get(`carrinho/`)
      const cart = cartResponse.data.rows;
    
      console.log(cart)

      const produtoNoCarrinho = cart.filter((cart: any) => {
        if(cart.produto.id == productId){
          console.log(cart)      
          return cart
        }
      })

      
      const productAlreadyInCart = produtoNoCarrinho[0]  
      console.log("productAlreadyInCart")
      console.log(productAlreadyInCart)
      
      const productResponse = await api.get<Product>(`produto/${productId}`);
      const  product  = productResponse.data;
      console.log(product)
      let  stock: number | null = product.quantidadeNoEstoque;
      if( stock == null ){
        stock = 999
      }

      
      console.log('stock: ' + stock)
      const stockIsFree = quantidade > stock
      console.log('stockIsFree: ' + stockIsFree)

      if(stockIsFree) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      
      productAlreadyInCart.quantidade = quantidade

      const response = await axios({
        method: 'put',
        url: `http://${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },              
        timeout: 50000,
        data   : productAlreadyInCart
      })              

      console.log(response)


    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
