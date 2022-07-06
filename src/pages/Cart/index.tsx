import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { api, id, ip, role } from "../../services/api";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total, FooterContainer } from "./styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { Product } from "../../types";

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [canClick, setCanClick] = useState(false);

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



  function goToNextPageWithAuth(){
    if(!canClick) return toast.error("Cadastre seu CPF e outros dados em meu perfil antes de poder comprar.")
    
    window.location.hash = window.location.hash.replace('/cart', '/pagar')
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
      quantidade: product.quantidade 
    };
    updateProductAmount(IncrementArguments);
  }

  function handleProductDecrement(product: Product) {
    const IncrementArguments = {
      productId: product.produto.id,
      quantidade: product.quantidade
    };
    updateProductAmount(IncrementArguments);
  }

  function handleRemoveProduct(productId: string, index: number) {
    // console.log("nbjkvnbvfnklbnvkjbnckjvnbkjcvnbkncvjbnkcvnjv")
    setLoading(true)
    removeProduct(productId);
    
    let newProd = [...products]
    newProd.splice(index, 1)
    setProducts(newProd)

    // console.log("newProd")
    // console.log(newProd)
    
    setLoading(false)
  }

  useEffect(() => {
    if (role != 'pessoa') {
      // Simulate an HTTP redirect:
      window.location.replace(`${ip}/#/erro`);
    }
    async function loadProducts() {
      setLoading(true)
      const response = await api.get('carrinho/')
        .then(response => {
          return response.data.rows;
        })

      
      const isUserRegistered = await api.get(`pessoa-fisica-perfil`)
      // ?filter%5BuserId%5D=${id}/`)
      .then(response => {
        setCanClick(!!response.data)
      })




      setProducts(response);
      setLoading(false)
    }

    loadProducts();
  }, []);

  function updateIncrement(index: number) {
    // atribuir o antigo array a uma variavel fazendo o destruct e atualizando ela
    let updatedProduct = [...products]

    if (updatedProduct[index].quantidade+1 <= updatedProduct[index].quantidadeNoEstoque){
      updatedProduct[index].quantidade++
      handleProductIncrement(updatedProduct[index])
      setProducts(updatedProduct)
    }
    
    else {
      return toast.error("Quantidade Solicitada fora de Estoque!")
    }
  }

  function updateDecrement(index: number) {
    let updatedProduct = [...products]

    updatedProduct[index].quantidade--
    handleProductDecrement(updatedProduct[index])
    setProducts(updatedProduct)

  }
  /*Possível useEfect para alterar os valores dos produtos?*/

  //Está sendo alterado o useState mas não está sendo mostrado na

  // console.log("products.length")
  // console.log(products.length)

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
                  {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'} alt="Loading" /> : 
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.produto.id, index)}
                    >
                      <MdDelete 
                      size={20} />
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            {
              products.length > 0 ? (
                <button onClick={() => goToNextPageWithAuth()} >Finalizar pedido</button>
              ) : false
            }
            {/* {console.log(products.length)} */}
            {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'} alt="Loading" /> : false}
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
