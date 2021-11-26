import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { api } from "../../services/api";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total, FooterContainer } from "./styles";
import { Link } from "react-router-dom";
import axios from "axios";
let token = localStorage.getItem("token")?.replace(/"/g, "");

//CRIAR FUNÇÃO PARA PEGAR OS PRODUTOS DO CARRINHO DO BACKEND

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}
  //Puxar os produtos do carrinho
    //tenantId

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const [products, setProducts] = useState<ProductFormatted[]>([]);

  interface ProductFormatted extends Product {
  priceFormatted: string;
  }

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subtotal: formatPrice(product.price * product.amount),
  }));
  const total = formatPrice(
    cartFormatted.reduce((sumTotal, product) => {
      sumTotal += product.price * product.amount;

      return sumTotal;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    const IncrementArguments = {
      productId: product.id,
      amount: product.amount + 1,
    };
    updateProductAmount(IncrementArguments);
  }

  function handleProductDecrement(product: Product) {
    const IncrementArguments = {
      productId: product.id,
      amount: product.amount - 1,
    };
    updateProductAmount(IncrementArguments);
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  useEffect(() => {
    async function loadProducts() {
      /*const response = await api.get(
        "tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/carrinho/"
        //  "tenant/:tenantId/carrinho/"
    
        );
      */

      const instance = axios.create({
        baseURL: 'http://localhost:8157/api/',
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+ token}
      });
      
      const response = await instance.get('tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/carrinho/')
      .then(response => {
          return response.data;
          
      })
      console.log("res: "+response.data);
      /*const productsFormated = response.data.map(function (product: Product) {
        console.log(product);
        
        return { ...product, price: formatPrice(product.price) };
      });
      setProducts(productsFormated);*/
    }
    
    loadProducts();
  }, []);

  



  return (
    <>
      <Header />
      <div className="container">
        <Container>
          <ProductTable>
            <thead>
              <tr>
                <th aria-label="product image" />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label="delete icon" />
              </tr>
            </thead>
            <tbody>
              {cartFormatted.map((product) => (
                <tr data-testid="product" key={product.id}>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={product.amount <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={product.amount}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subtotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <Link to="/pagar">Finalizar pedido</Link>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </Container>
      </div>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
};

export default Cart;
