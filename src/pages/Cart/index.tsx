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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  interface Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    publicUrl: string;
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
    publicUrl: string;
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

  function handleRemoveProduct(productId: string, index: number) {
    setLoading(true)
    removeProduct(productId);
    products.splice(index, 1)
    setProducts(products)
    setLoading(false)
  }

  useEffect(() => {
    if (role != 'pessoa') {
      // Simulate an HTTP redirect:
      window.location.replace(`http://dev.42dias.com.br/Clientes/constal/#/erro`);
    }
    async function loadProducts() {
      setLoading(true)
      const response = await api.get('carrinho/')
        .then(response => {
          return response.data.rows;
        })

      console.log("cart");
      console.log(response);

      setProducts(response);
      setLoading(false)
    }

    loadProducts();
  }, []);

  function updateIncrement(index: number) {

    // atribuir o antigo array a uma variavel fazendo o destruct e atualizando ela
    let updatedProduct = [...products]
    updatedProduct[index].quantidade++
    handleProductIncrement(updatedProduct[index])
    setProducts(updatedProduct)

  }

  function updateDecrement(index: number) {
    let updatedProduct = [...products]
    updatedProduct[index].quantidade--
    handleProductIncrement(updatedProduct[index])
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
              {products.map((product: any, index) => (
                <tr data-testid="product" key={product.produto.id}
                >
                  <td>
                    <img src={product.imagemUrl} alt={product.produto.nome} />
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
                        formatPrice(product.produto.preco * product.quantidade)
                      }</strong>
                  </td>
                  <td>
                  {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : 
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.produto.id, index)}
                    >
                      <MdDelete size={20} />
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <Link to="/pagar">Finalizar pedido</Link>
            {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}
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
