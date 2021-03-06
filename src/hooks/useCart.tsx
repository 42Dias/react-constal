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
  addProduct:    (productId: string, quantidade: number) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, quantidade }: UpdateProductAmount) => void;
  update: number
}

const tenantId = "fa22705e-cf27-41d0-bebf-9a6ab52948c4";


const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const [update, setUpdate] = useState(0);


    const cart = async () => {
      const allCart: any  = await api.get(`carrinho/`)
      console.log("allCart")
      console.log(allCart.data.count)
      // return allCart.data.rows.lenght;
      return allCart.data.count;
      }
    

  const addProduct = async (productId: string, quantidade: number) => {
    toast.info("Carregando...")
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

    const productResponse = await api.get<Product>(`produto/${productId}`);//jogar como variavel que abrange todo o escopo da fun????o
    const  product  = productResponse.data;
    if(product.isOferta === true){
      console.log("product.isOferta == true")
      console.log(product.isOferta == true)
      product.preco = product.precoOferta
    }

    console.log("product.isOferta == true")
    console.log(product.isOferta == true)
    

    console.log("product")
    console.log(product)
    
    const  stock: number  = product.quantidadeNoEstoque;
    
    console.log("stock") 
    console.log(stock) 

    console.log(update)
    
    let somaDeItens: number = 0 
    /*
    Est?? ?? a quantidade de items em todo o carrinho
    */ 
    const quantidadeDeItemsNoCarrinho = () =>{
        cart.map((cart:any) =>
        somaDeItens += cart.quantidade
        )
        return somaDeItens
    }

    console.log(update)

    
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
              url: `${ip}:8157/api/tenant/${tenantId}/carrinho/`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },              
              timeout: 50000,
              data   : { product, 'quantidade': quantidade }
            }).then(
              (response) => {
                if(response.status == 200){
                  toast.info("Produto adicionado ao carrinho com sucesso!")
                  console.log("update 0")
                  console.log(update)
                  setUpdate(prevValue => {
                    return prevValue+1	
                     })
                  console.log("update 1")
                  console.log(update)


                }
                else if(response.status == 500){
                  toast.error("Problemas com o servidor :(")
                }
                else{
                  toast.error("Erro na adi????o do produto")
                }
              }
            )              
          console.log(JSON.stringify( { product, quantidade: quantidade }))


          
          /* para mudar a quantidade

          const response = await fetch(
            `localhost:8157/api/tenant/${tenantId}/carrinho/${cartId}`, {
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
        console.log("PRODUTO EST?? EN EL CARI??O")
        const  stock: number  = product.quantidadeNoEstoque;
        console.log(productAlreadyInCart)
        if (stock > productAlreadyInCart.quantidade + quantidade) {

        productAlreadyInCart.quantidade = productAlreadyInCart.quantidade + quantidade;
          
          const response = await axios({
            method: 'put',
            url: `${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            },              
            timeout: 50000,
            data   : productAlreadyInCart
          })
          .then(
            (response) => {
              if(response.status == 200){
                toast.info("Produto adicionado ao carrinho com sucesso!")
              }
              else if(response.status == 500){
                toast.error("Problemas com o servidor :(")
              }
              else{
                toast.error("Erro na adi????o do produto")
              }
            }
          )              
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
      toast.error('Erro na adi????o do produto')
    }
  };

  const removeProduct = async (productId: string) => {
      toast.info("Carregando")

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
        toast.error('Erro na remo????o do produto');
        return
      }
  
      const response = await axios({
        method: 'delete',
        url: `${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },              
        timeout: 50000,
        data   : productAlreadyInCart
      }).then(
        (response) => {
          if(response.status == 200){
            toast.info("Produto removido com sucesso!")
            setUpdate(prevValue => {
              return prevValue-1	
               })
          }
          else{
            toast.error("Erro :(")
          }
        }
      )              

    } catch {
      toast.error('Erro na remo????o do produto');
    }
  };  

  const updateProductAmount = async (//apenas dar um post com a nova quantidade com o id do carrinho
    {
    productId,
    quantidade,
  }: UpdateProductAmount) => {
    try {
      if(quantidade < 1){
        toast.error('Erro na altera????o de quantidade do produto');
        return
      }
      toast.info("Carregando...")


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
        url: `${ip}:8157/api/tenant/${tenantId}/carrinhoProduto/`,
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
      toast.error('Erro na altera????o de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount, update }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
