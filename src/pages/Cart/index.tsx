import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { api, ip, role } from "../../services/api";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total, FooterContainer } from "./styles";
import { Link } from "react-router-dom";
// import { Product } from "../../types";

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  


  const [products, setProducts] = useState<Carrinho[]>([]);

    interface Product {
      id: string;
      nome: string;
      descricao: string;
      preco: number;
      publicUrl:string;
      isOferta: number;
      precoOferta: any;
      produto: any;
      quantidade: number;
      subtotal: number;
    }

    interface Carrinho {
      price: number | bigint;
      id: string;
      nome: string;
      descricao: string;
      preco: number;
      publicUrl:string;
      isOferta: number;
      precoOferta: any;
      quantidade: number;
      subtotal: number;
      priceFormatted: string;
      produto: {
        fotos: string;
        id: string;
        nome: string;
        preco: number;
        quantidade: number;
      };
    }
    
  interface ProductFormatted extends Product {
    priceFormatted: string;
  }

  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal += product.produto.preco * product.quantidade;
      return sumTotal;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    const IncrementArguments = {
      productId: product.produto.id,
      quantidade: product.quantidade + 1,
    };
    updateProductAmount(IncrementArguments);
  }

  function handleProductDecrement(product: Product) {
    const IncrementArguments = {
      productId: product.produto.id,
      quantidade: product.quantidade - 1,
    };
    updateProductAmount(IncrementArguments);    
  }

  function handleRemoveProduct(productId: string) {
    removeProduct(productId);
    
  }

  useEffect(() => {
    if(role != 'pessoa'){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
    }
    async function loadProducts() {
      const response = await api.get('carrinho/')
      .then(response => {
          return response.data.rows;          
      })

     console.log("cart");
     console.log(response);

      setProducts(response);
    }
    
    loadProducts();
  }, []);

  function updateIncrement(index: number) {

    // atribuir o antigo array a uma variavel fazendo o destruct e atualizando ela
    let updatedProduct = [...products]
    updatedProduct[index].quantidade++
    console.log("updatedProduct")
    setProducts(updatedProduct)
    
  }
  
  function updateDecrement(index: number) {
    let updatedProduct = [...products]
    updatedProduct[index].quantidade--
    setProducts(updatedProduct)
  
  }
  /*Possível useEfect para alterar os valores dos produtos?*/

//Está sendo alterado o useState mas não está sendo mostrado na

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
              {products.map((product: Carrinho, index) => (
                <tr data-testid="product" key={product.produto.id}
                >
                  <td>
                    <img src={product.produto.fotos} alt={product.produto.nome} />
                  </td>
                  <td>
                    <strong>{product.produto.nome}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={product.quantidade <= 1}
                        onClick={() => {
                          updateDecrement(index)
                        }}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={
                          product.quantidade
                          // howMuch[index]
                        }
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => {
                          updateIncrement(index)
                        }}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>
                      {
                      formatPrice( product.produto.preco * product.quantidade )
                      }</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.produto.id)}//aqui ele retorna que é num
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
