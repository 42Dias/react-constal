import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { ProductList, BannerHome } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/products");
      const productsFormated = response.data.map(function (product: Product) {
        return { ...product, price: formatPrice(product.price) };
      });
      setProducts(productsFormated);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <>
      <BannerHome>
        <section className="banner-home">
          <div className="container">
            <div className="bg-content-home">
              <h1>Uma descrição sobre a visão da Constal</h1>
              <p>
                Morbi vitae lorem nisl. Sed lobortis non sapien sit amet
                consectetur. Suspendisse libero magna, lobortis ac neque non,
                porttitor ornare quam. Ut non pretium leo.
              </p>
            </div>
          </div>
        </section>
      </BannerHome>

      <div className="container">
        <ProductList>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.price}</span>
              <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))}
        </ProductList>
      </div>
    </>
  );
};

export default Home;
