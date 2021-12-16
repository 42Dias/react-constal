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
import { api, ip, role } from "../../services/api";
import { formatPrice } from "../../util/format";
import { Menu } from "../../components/Menu";

export default function Favorites() {

  //PROBLEMA NO MAP NO RETURN
  const [favorito = [], setFavoritos] = useState<string[]>([]);

  const products: any = [] //provavel useState aqui!!!!

// function setFavoritos(favoritos: string[], produtoId: string){//essa função vai para o produto e home
//     if(favoritos != []){
//         favoritos.push(produtoId)
//     }
//     else{
//         localStorage.setItem("favorito", JSON.stringify([produtoId]))
//     }
// }

  useEffect(() => {
    if(role != 'pessoa'){
      // Simulate an HTTP redirect:
      window.location.replace(`http://${ip}:3000/constal#/erro`);
    }
    async function loadFavoritos(favoritos: string[]){
      console.log("favoritos");
      console.log(favoritos);
        favoritos.map(
            async favorito => {
                console.log("favorito")
                console.log(favorito)
                const response = await api.get(`produto/${favorito}`);
                console.log("response.data")
                console.log(response.data)
                // setProducts(response.data)

                products.push(response.data)

               setFavoritos(prevProducts => {
                  return [...new Set([...prevProducts, response.data])] 
               })
            } 
        )
  }

    async function loadProducts() {
      const favoritos: string[] = JSON.parse(localStorage.getItem("favorito") || '[]' );
      console.log("favoritos")
      console.log(favoritos)
      loadFavoritos(favoritos);
    }
    loadProducts();
  }, []);
    console.log(favorito)



  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <Title>Favoritos</Title>
          {
            favorito.map((product: any) => (
              <CardDatailsContent>
              <ContentDetails>
                <span>{product.nome}</span>
                <p>{formatPrice(product.preco)}</p>
              </ContentDetails>
              <Link to="">Comprar</Link>
            </CardDatailsContent>  
            )
            )
          } 

        </CardDatails>  

      </div>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
