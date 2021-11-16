import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdAddShoppingCart } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { BannerHome, SwiperStyles, BarHome, FlexBar } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";
import "swiper/swiper.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MenuCliente from "../../components/MenuCliente";

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
      const response = await api.get("/APISincronizarSistema3.php");
      console.log(response.data);
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
      <Header />
      <MenuCliente />
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

        <BarHome>
          <div className="container">
            <FlexBar>
              <div>
                <FiCheck size={30} />
                <h5>Pagamento seguro</h5>
              </div>
              <div>
                <FiCheck size={30} />
                <h5>Transações pix</h5>
              </div>
              <div>
                <FiCheck size={30} />
                <h5>Pague via boleto</h5>
              </div>
              <div>
                <FiCheck size={30} />
                <h5>Cartão de crédito</h5>
              </div>
              <div>
                <FiCheck size={30} />
                <h5>Atendimento ao cliente</h5>
              </div>
            </FlexBar>
          </div>
        </BarHome>

        <SwiperStyles>
          <div className="container">
            <h2>Ofertas e promoções</h2>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {products.map((product) => (
                <SwiperSlide>
                  <li key={product.id}>
                    <Link to={`/produto/${product.id}`}><img src={product.image} alt={product.title} /></Link>
                    <strong>{product.title}</strong>
                    <p>{product.price}</p>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SwiperStyles>

        <SwiperStyles>
          <div className="container">
            <h2>Produtos em destaque</h2>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {products.map((product) => (
                <SwiperSlide>
                  <li key={product.id}>
                    <Link to={`/produto/${product.id}`}><img src={product.image} alt={product.title} /></Link>
                    <strong>{product.title}</strong>
                    <p>{product.price}</p>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SwiperStyles>
      <Footer />
    </>
  );
};

export default Home;
