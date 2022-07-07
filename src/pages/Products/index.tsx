import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";
import React, { useState ,useEffect, useRef, useCallback } from "react";
import { api, role, semImagem } from "../../services/api";
import { formatPrice } from "../../util/format";

import { useCart } from "../../hooks/useCart";

import { AiOutlinePlus } from "react-icons/ai";
import { Recommended, GridProdsFour, ProdContainerSingle } from "./styles";
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { Menu } from "../../components/Menu";
import Loading from "../../components/Loading";


export default function Products() {


  const { addProduct, cart } = useCart();

  const [number, setNumber] = useState(1)

 const { loading, products, hasMore } = useInfiniteScroll(number)

  useInfiniteScroll(number)
  

  const observer: any = useRef()
  const lastProdElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])



  function handleAddProduct(id: number) {
  // addProduct(id);
  }



  return (
    <>
      <Header />
      <Menu />
      <div className="container">
      {
        role != 'admin' && role != 'empresa' ? (
          <Recommended>
          <h4>Recomendados</h4>
          </Recommended>
        ) : false
      }
      <GridProdsFour>
    {products.map((product: any, index: number) => {
        if(products.length === index + 1){
          return <ProdContainerSingle ref={lastProdElementRef}  key={product.id}>
                    <Link to={`/produto/${product.id}`}>
                        <img src={product.imagemUrl || semImagem} alt={product.nome} />
                    </Link>
                    <h5>{product.nome}</h5>
                    <p>{product.descricao}</p>
                    <div className="btn-group-add">
                      <span>
                      <b>{formatPrice(product.preco)}</b>
                      </span>
                      
                        {
                        role == 'empresa' || role == 'admin' ? false : 
                        <div className="btn-more"
                          onClick={() => handleAddProduct(product.id)}
                          >
                          <AiOutlinePlus />
                        </div>
                      }
                      </div>
                </ProdContainerSingle>
        }
        else{
          return <ProdContainerSingle key={product.id}>
                    <Link to={`/produto/${product.id}`}>
                        <img src={product.imagemUrl || semImagem} alt={product.nome} />
                    </Link>
                    <h5>{product.nome}</h5>
                    <p>{product.descricao}</p>
                    <div className="btn-group-add">
                      <span>
                        <b>{formatPrice(product.preco)}</b>
                      </span>
                      {
                        role == 'empresa' || role == 'admin' ? false : 
                        <div className="btn-more"
                          onClick={() => handleAddProduct(product.id)}
                          >
                          <AiOutlinePlus />
                        </div>
                      }
                    </div>
                </ProdContainerSingle>}
      })}
        </GridProdsFour>
        <Loading loading={loading} />
      </div>
      <Footer />
    </>
  );
}
