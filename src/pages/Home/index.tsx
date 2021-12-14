import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdAddShoppingCart } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper';
import "swiper/swiper.scss";

import { SwiperStyles, BarHome, FlexBar, BannerHomeImage } from "./styles";
import { api, ip } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import moveis from "../../assets/images/moveis.png";
import eletrodomesticos from "../../assets/images/eletrodomesticos.png";
import materiais from "../../assets/images/materiais.png";
import cama from "../../assets/images/cama.png";
import modainfantil from "../../assets/images/modainfantil.png";
import modafeminina from "../../assets/images/modafeminina.png";
import modamasculina from "../../assets/images/modamasculina.png";
import axios from "axios";
import { Menu } from "../../components/Menu";

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  publicUrl: string;
  isOferta: number;
  precoOferta: any;
  quantidadeNoEstoque: number;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

let productCounter: any[] = [];

SwiperCore.use([Autoplay,Pagination,Navigation]);

const Home = (): JSX.Element => {

  

  const [products = [], setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();
  
  //console.log("ip: "+ip);
  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get("http://"+ip+":8157/api/produtos");
      
      const productsFormated = response.data.record.map(function (
        product: Product
      ) {
        return { ...product, preco: formatPrice(product.preco) };
      });
      setProducts(productsFormated);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id: string) {
    addProduct(id);
  }

  return (
    <>
      <Header />
      <Menu />
      
      <BannerHomeImage>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
        >
          <SwiperSlide><img src={moveis} alt="moveis" /></SwiperSlide>
          <SwiperSlide><img src={materiais} alt="materiais" /></SwiperSlide>
          <SwiperSlide><img src={eletrodomesticos} alt="eletrodomesticos" /></SwiperSlide>
          <SwiperSlide><img src={cama} alt="cama" /></SwiperSlide>
          <SwiperSlide><img src={modainfantil} alt="moda infantil" /></SwiperSlide>
          <SwiperSlide><img src={modafeminina} alt="moda feminina" /></SwiperSlide>
          <SwiperSlide><img src={modamasculina} alt="moda masculina" /></SwiperSlide>
        </Swiper>
      </BannerHomeImage>

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
          {products.forEach((p) => {
            if (p.isOferta === 1) {
              productCounter.push(p);
            }

            //console.log(productCounter);
            //console.log(products.length);
          })}

          {productCounter.length === 0 ? (
            <p>Nenhum produto em promoção</p>
          ) : (
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {productCounter.map((product) => (
                <SwiperSlide>
                  {product.isOferta === 1 && (
                    <li key={product.id}>
                      <Link to={`/produto/${product.id}`}>
                        <img src={product.publicUrl} alt={product.nome} />
                      </Link>
                      <strong>{product.nome}</strong>
                      <p>R$ {product.precoOferta}</p>
                      <button
                        type="button"
                        data-testid="add-product-button"
                        onClick={() => handleAddProduct(product.id)}
                      >
                        <div data-testid="cart-product-quantity">
                          <MdAddShoppingCart size={16} color="#FFF" />
                          {product.quantidadeNoEstoque}
                        </div>

                        <span>ADICIONAR AO CARRINHO</span>
                      </button>
                    </li>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
                  <Link to={`/produto/${product.id}`}>
                    <img src={product.publicUrl} alt={product.nome} />
                  </Link>
                  <strong>{product.nome}</strong>
                  <p>{product.preco}</p>
                  <button
                    type="button"
                    data-testid="add-product-button"
                    onClick={() => handleAddProduct(product.id)}
                  >
                    <div data-testid="cart-product-quantity">
                      <MdAddShoppingCart size={16} color="#FFF" />
                      {product.quantidadeNoEstoque}
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
