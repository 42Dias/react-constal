import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import axios from 'axios';

let token = localStorage.getItem("token")?.replace(/"/g, "");


interface Product{
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
  cart: any;
  addProduct:    (productId: string) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, quantidade }: UpdateProductAmount) => void;
}

const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {//para oo projeto mais avançado o useState não tem tanta importancia
    const storagedCart = localStorage.getItem('@RocketShoes:cart')//NEM O LOCALSTORAGE

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: string) => {
    console.log("productId")
    console.log(productId)

    const cartResponse = await api.get(`tenant/${tenantId}/carrinho/`)
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

    const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
    const  product  = productResponse.data;
    

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
      
      if(!productAlreadyInCart.id) {
      
        console.log("ARRIVA");
      

        console.log("product");
        console.log(product); 
        
        if(stock > 0) {
          setCart([...cart, {...product, quantidade: 1}])
          //AQUI É O CARRINHO
          //GUARDAR ESSA FUNÇÃO PARA ATUALIZAR A QUATIDADE


          const response = await axios({
              method: 'post',
              url: `http://localhost:8157/api/tenant/${tenantId}/carrinho/`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },              
              timeout: 50000,
              data   : { product, quantidade: 1 }
            })              
          console.log(JSON.stringify( { product, quantidade: 1 }))

          /*
          
          */


          /*
          // para mudar a quantidade

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
      }

      else if(productAlreadyInCart.id) {
        console.log("PRODUTO ESTÁ EN EL CARIÑO")
        const  stock: number  = product.quantidadeNoEstoque;
        console.log(productAlreadyInCart)
        if (stock > productAlreadyInCart.quantidade) {

          let novaQuantidade = productAlreadyInCart.quantidade;
          
          novaQuantidade++

          const response = await axios({
            method: 'put',
            url: `http://localhost:8157/api/tenant/${tenantId}/carrinhoProduto/${productAlreadyInCart.id}`,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            },              
            timeout: 50000,
            data   : { product, quantidade: novaQuantidade }
          })              
          console.log({ product, quantidade: novaQuantidade })
          console.log(response)
          return;
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = async (productId: string) => {
      const produtoNoCarrinho = cart.filter((cart: any) => {
        if(cart.produto.id == productId){
          console.log(cart)      
          return cart
        }
      })    
    
      const productAlreadyInCart = produtoNoCarrinho[0]  
      console.log("productAlreadyInCart")
      console.log(productAlreadyInCart)

    
    const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
    
    const  product  = productResponse.data;
    
    const  stock: number  = product.quantidadeNoEstoque;
    
    try {
      if(!productAlreadyInCart.id) {
        toast.error('Erro na remoção do produto');
        return
      }
  
      // post com a url de delete?
      const response = await api.post(`/tenant/${tenantId}/carrinho/`);
      // usar o post acima
      console.log(response)
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
      
      const produtoNoCarrinho = cart.filter((cart: any) => {
        if(cart.produto.id == productId){
          console.log(cart)      
          return cart
        }
      })    
    
      const productAlreadyInCart = produtoNoCarrinho[0]  
      console.log("productAlreadyInCart")
      console.log(productAlreadyInCart)

      const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);
      const  product  = productResponse.data;
      const  stock: number  = product.quantidadeNoEstoque;
      //quantos no estoque
      console.log('stock: ' + stock)
      const stockIsFree = quantidade > stock
      console.log('stockIsFree: ' + stockIsFree)

      if(stockIsFree) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      
      const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
        ...cartItem,
        quantidade: quantidade
      } : cartItem)
      //apenas fazer requisição para a alteração do carrinho com a nova quantidade
      //não é necessária a esse updated cart, passar a quantidade como variavel para o body do post de requisição

      const response = await api.post(`/tenant/${tenantId}/carrinho/`, updatedCart);
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
