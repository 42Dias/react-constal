import { createContext, useState, useEffect, useContext } from "react";
import { id, token } from "../services/api";
import addInCart from "../services/carrinho/addInCart";
import deleteAllFromCart from "../services/carrinho/deleteAllFromCart";
import deleteProductOfCart from "../services/carrinho/deleteProductOfCart";
import loadCart from "../services/carrinho/loadCart";

import makeSumToCarrinho from "../utils/makeSumToCarrinho";

// const cartFromLocalStorage = JSON.parse(getTotalAmount);

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {

  async function addItemToCart(prodData) {

    let loadedCart =  await getCart() 
    
    await addInCart(prodData, loadedCart, 1 )
    
    let formatedList = await getCart()

    setCart(formatedList);
  }

  async function removeItemFromCart(prodData) {
    
    await deleteProductOfCart(prodData)
    
    let formatedList = await getCart()

    setCart(formatedList);
  }

  async function getTotalAmount() {
    let cart = await getCart();

    return makeSumToCarrinho(cart);
  }

  async function deleteAllCart() {

    let userId = id 
    await deleteAllFromCart(userId)

    let formatedList = await getCart()
    setCart(formatedList);
  }

  async function getCart() {
    if(!token) return []

    return await loadCart();
  }

  const [cart, setCart] = useState(getCart);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        getTotalAmount,
        getCart,
        deleteAllCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  const { cart, addItemToCart, removeItemFromCart, getTotalAmount, getCart, deleteAllCart } = context;

  return { cart, addItemToCart, removeItemFromCart, getTotalAmount, getCart, deleteAllCart };
}
