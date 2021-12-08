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

    const cartId = cart[0].id;
    console.log("cartId")  
    console.log(cartId)  

    const produtoNoCarrinho = cart[0].produto
    console.log(produtoNoCarrinho)

    const productAlreadyInCart = cart.map((product: any) => {
      if(product.id == productId){
        return product
      }
      else{
        return
      }
    })
    // productAlreadyInCart(produtoNoCarrinho)
    
    
    console.log("productAlreadyInCart")  
    console.log(productAlreadyInCart)  

    const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
    const  product  = productResponse.data;
    product.quantidade = 1;

    console.log("product")
    console.log(product)
    
    const  stock: number  = product.quantidadeNoEstoque;
    
    console.log("stock") 
    console.log(stock) 
    
    let somaDeItens: number = 0 

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
              url: `http://localhost:8157/api/carrinho/`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },              
              timeout: 50000,
              data   : product
            })              
          console.log(JSON.stringify( product ))

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
        console.log("PRODUTO")
        const  stock: number  = product.quantidadeNoEstoque;
        console.log(productAlreadyInCart)
        if (stock > productAlreadyInCart.quantidade) {
          productAlreadyInCart.quantidade++;
  
          const response = await fetch(
            `http://localhost:8157/api/tenant/${tenantId}/carrinho/${productAlreadyInCart.id}`, {
              method: "PUT",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },
              body: JSON.stringify(product)
          });
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
    const productAlreadyInCart: any = cart.map((product: any) => {
      if(product.id == productId){
        return product
      }
      else{
        return
      }
    })
    
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

  const updateProductAmount = async (
    {
    productId,
    quantidade,
  }: UpdateProductAmount) => {
    try {
      if(quantidade < 1){
        toast.error('Erro na alteração de quantidade do produto');
        return
      }
      
    const productAlreadyInCart = cart.find(product => product.id == productId)
    // pega o id do produto e faz um map sobre ele achando o id do produto dentro do cart

    const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
    //post usado acima
    const  product  = productResponse.data;
    const  stock: number  = product.quantidadeNoEstoque;
    
      const productAmount = stock;//quantos no estoque
      const stockIsFree = quantidade > productAmount

      if(stockIsFree) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      // não necessária para a verificação, productAlreadyInCart já dá conta
      if(!productExists) {
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
        ...cartItem,
        quantidade: quantidade
      } : cartItem)
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
