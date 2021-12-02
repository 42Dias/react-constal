import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  Title,
} from "./styles";
import React, { useState ,useEffect } from "react";
import prodfav from "../../assets/images/prodfav.png";
import { Product } from '../../types';
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";

export default function Favorites() {

  const [products = [], setProducts] = useState<Product[]>([]);



// function setFavoritos(favoritos: string[], produtoId: string){//essa função vai para o produto e home
//     if(favoritos){
//         favoritos.push(produtoId)
//     }
//     else{
//         localStorage.setItem("favorito", JSON.stringify([produtoId]))
//     }
// }
function loadFavoritos(favoritos: string[]){
    if(favoritos){
        favoritos.map(
            async favorito => {
                console.log(favorito)
                const response: Product[] = await api.get(`produto/${favorito}`);
                setProducts(response)
            } 
        )
    }
}

  useEffect(() => {
    
    async function loadProducts() {
      const favoritos: string[] = JSON.parse(localStorage.getItem("favoritos") || '[]' );
      loadFavoritos(favoritos)
    }
  loadProducts();
  }, []);
  



  return (
    <>
      <Header />
      <div className="container">
        <CardDatails>
          <Title>Favoritos</Title>
          {
            products.map((product: any) => (
              <CardDatailsContent>
              <ContentDetails>
                <img src={prodfav} alt="" />
                <span>product.nome</span>
                <p>formatPrice(product.preco)</p>
              </ContentDetails>
              <Link to="">Comprar</Link>
            </CardDatailsContent>  
            )
            )
          }

          <CardDatailsContent>
            <ContentDetails>
              <img src={prodfav} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <Link to="">Comprar</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={prodfav} alt="" />
              <span>Headset Preto</span>
              <p>R$ 999,99</p>
            </ContentDetails>
            <Link to="">Comprar</Link>
          </CardDatailsContent>
        </CardDatails>  

      </div>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
