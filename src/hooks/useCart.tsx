import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface Product{
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
  cart: Product[];
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
    console.log(productId)
    try {
      const productAlreadyInCart = cart.find(product => product.id == productId)

      if(!productAlreadyInCart) {
        const productResponse = await api.get<Product>(`/tenant/${tenantId}/produto/${productId}`);//jogar como variavel que abrange todo o escopo da função
        const  product  = productResponse.data;
        console.log("product")
        console.log(product)
        const  stock: number  = 10;//AQUI VIRIA A QUANTIDADE DO ESTOQUE!!!! FUTURA ADIÇÃO

        if(stock > 0) {
          setCart([...cart, {...product, quantidade: 1}])
          //AQUI É O CARRINHO 
          const response = await api.post(`/tenant/${tenantId}/carrinho/`);
          response.data =+ [...cart, {...product, quantidade: 1}];
          return;
        }
      }

      if(productAlreadyInCart) {
        const { data: stock } = await api.get(`stock/${productId}`)

        if (stock.quantidade > productAlreadyInCart.quantidade) {
          const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
            ...cartItem,
            quantidade: Number(cartItem.quantidade) + 1 //aqui alterar quantidade no carrinho produto | cartItem.quantidade
          } : cartItem)
  
          setCart(updatedCart)
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
          return;
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = (productId: string) => {
    try {
      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if(!productExists) {
        toast.error('Erro na remoção do produto');
        return
      }
  
      const updatedCart = cart.filter(cartItem => cartItem.id !== productId)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    quantidade,
  }: UpdateProductAmount) => {
    try {
      if(quantidade < 1){
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const response = await api.get(`/stock/${productId}`);
      const productAmount = response.data.amount;
      const stockIsFree = quantidade > productAmount

      if(stockIsFree) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if(!productExists) {
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
        ...cartItem,
        quantidade: quantidade
      } : cartItem)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
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
