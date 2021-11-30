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
// import { Product } from "../../types";

//CRIAR FUNÇÃO PARA PEGAR OS PRODUTOS DO CARRINHO DO BACKEND
  //Puxar os produtos do carrinho
    //tenantId

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const [products, setProducts] = useState<ProductFormatted[]>([]);

    interface Product {
      id: number;
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
  interface ProductFormatted extends Product {
    priceFormatted: string;
  }

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.produto.preco),
    subtotal: formatPrice(product.produto.preco * product.quantidade),
  }));
  console.log(cartFormatted)
  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal += product.produto.preco * product.quantidade;
      return sumTotal;
    }, 0)
  );

  // function handleProductIncrement(product: Product) {
  //   const IncrementArguments = {
  //     productId: product.produto.id,
  //     quantidade: product.quantidade + 1,
  //   };
  //   updateProductAmount(IncrementArguments);
  // }

  // function handleProductDecrement(product: Product) {
  //   const IncrementArguments = {
  //     productId: product.produto.id,
  //     quantidade: product.quantidade - 1,
  //   };
  //   updateProductAmount(IncrementArguments);
  // }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('tenant/fa22705e-cf27-41d0-bebf-9a6ab52948c4/carrinho/')
      .then(response => {
          //console.log(response.data.count);
          return response.data.rows;          
      })

     console.log("cart");
     console.log(response);

      
       /*const productsFormated = response.rows.map(function (
        product: Product
      ) {
        console.log(productsFormated);
        return { ...product, preco: formatPrice(product.preco) };
      });
     */
     const productsFormated = response.map(function (product: { produto: { preco: number | bigint; }; }) {
        console.log("prod");
        console.log(product);     
        return  product ;
      });

      console.log("cartF");
      console.log(cartFormatted)
      setProducts(productsFormated);
    }
    
    loadProducts();
  }, []);

  
//Está puxando mas não mostrando


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
              {/* A VARIAVEL DO CARRINHO ESTÁ SENDO ATRIBUIDA A PRODUCT */}
              {products.map((product) => (
                <tr data-testid="product" key={product.produto.id}>
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
                        // onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={product.quantidade}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        // onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{
                      formatPrice(product.quantidade * product.produto.preco)
                      }</strong>
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
