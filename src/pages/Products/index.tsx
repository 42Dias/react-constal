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
                        R$<b>{product.preco}</b>
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
                        R$<b>{product.preco}</b>
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
        {loading ? (
            <img
              width="40px"
              style={{    
                margin: '0 auto',
                display: 'flex' }}
              height=""
              src={"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"}
              alt="Loading"
            />
          ) : false}
      </div>
      <Footer />
    </>
  );
}
    /*
    =========================
    CÓDIGO A SER IMPLEMENTADO
    =========================
    necessidade: id Único para o cliente para fazer a requisição => mudança necessária na base de dados  
    */
/*
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";
import React, { useState ,useEffect } from "react";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";

import { useCart } from "../../hooks/useCart";

import { AiOutlinePlus } from "react-icons/ai";
import { Recommended, GridProdsFour, ProdContainerSingle } from "./styles";
import MenuEmpresa from "../../components/MenuEmpresa";

export default function Products() {

  interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    publicUrl:string;
    isOferta: number;
    precoOferta: any;
  }
    
  interface ProductFormatted extends Product {
    priceFormatted: string;
  }
  const [products = [], setProducts] = useState<ProductFormatted[]>([]);

  const { addProduct, cart } = useCart();

  
  useEffect(() => {
    // async function loadProducts() {
    //   const response = await api.get("produtos")
    //   console.log(response.data);

    //   const productsFormated = response.data.record.map(function (product: Product) {
    //     return { ...product, preco: formatPrice(product.preco) };
    //   });
    //   for (let product in productsFormated){
    //     console.log(productsFormated[product]);

    //     return <ProdContainerSingle>
    //        <img src={productsFormated[product].publicUrl} alt="" />
    //        <h5>{productsFormated[product].nome}</h5>
    //        <p>{productsFormated[product].descricao}</p>
    //        <div className="btn-group-add">
    //          <span>
    //            R$<b>{productsFormated[product].preco}</b>
    //          </span>
    //          <div className="btn-more">
    //            <AiOutlinePlus />
    //          </div>
    //        </div>
    //    </ProdContainerSingle>

    async function loadProducts() {
      const response = await api.get(`produtos`);
      console.log(response.data);
      const productsFormated = response.data.record.map(function (product: Product) {
        return { ...product, preco: formatPrice(product.preco) };
      });
      setProducts(productsFormated);
    }
    
    loadProducts();
    
  }, []);

  function handleAddProduct(id: number) {
  addProduct(id);
  }

const  generateTemplate = (products: any[]) => {
  products.map((product) => (
    <ProdContainerSingle key={product.id}>
        <img src={product.publicUrl} alt={product.nome} />
       <h5>{product.nome}</h5>
       <p>{product.descricao}</p>
       <div className="btn-group-add">
         <span>
           R$<b>{product.preco}</b>
         </span>
         <div className="btn-more"
         onClick={() => handleAddProduct(product.id)}
         >
           <AiOutlinePlus />
         </div>
       </div>
   </ProdContainerSingle>
   ))
  }
  
// const loading = document.querySelector('.loader')
let page: number = 1
const postsContainer: any = document.querySelector('.posts-container')

const addPostsIntoDom = async (posts: any[]) => {
  const postsTemplate = generateTemplate(posts)

  postsContainer.innerHTML += postsTemplate

}

const handleScrollToPageBottom = () => {
  const {clientHeight, scrollHeight, scrollTop} = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -  10
  if ( isPageBottomAlmostReached ){
      showLoading()
  }
}
  const showLoading = () =>{
      // loading.classList.add('show')
      removeLoading()
  }
  const removeLoading = () =>{
    setTimeout(() => {
        // loading.classList.remove('show')
        getNextPosts()
    }, 1000)
  }
  
const getNextPosts = () =>{
  setTimeout(() => {//to the it not appear at same time that loader is displayed:
      page ++
      addPostsIntoDom(products)
  }, 300 )//this time is loader's animation time 
}


  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
        <Recommended>
          <h4>Recomendados</h4>
        </Recommended>
      <GridProdsFour className="postsContainer">
            
        </GridProdsFour>
      </div>
      <Footer />
      <div className="loader"></div>
    </>
  );
}
*/  /*
    =========================
    CÓDIGO A SER IMPLEMENTADO
    =========================
    necessidade: id Único para o cliente para fazer a requisição => mudança necessária na base de dados  
    */

// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// import { Link } from "react-router-dom";
// import React, { useState ,useEffect } from "react";
// import { api } from "../../services/api";
// import { formatPrice } from "../../util/format";

// import { useCart } from "../../hooks/useCart";

// import { AiOutlinePlus } from "react-icons/ai";
// import { Recommended, GridProdsFour, ProdContainerSingle } from "./styles";
// import MenuEmpresa from "../../components/MenuEmpresa";

// export default function Products() {

//   interface Product {
//     id: number;
//     nome: string;
//     descricao: string;
//     preco: number;
//     publicUrl:string;
//     isOferta: number;
//     precoOferta: any;
//   }
    
//   interface ProductFormatted extends Product {
//     priceFormatted: string;
//   }
//   const [products = [], setProducts] = useState<ProductFormatted[]>([]);

//   const { addProduct, cart } = useCart();

  
//   useEffect(() => {
//     // async function loadProducts() {
//     //   const response = await api.get("produtos")
//     //   console.log(response.data);

//     //   const productsFormated = response.data.record.map(function (product: Product) {
//     //     return { ...product, preco: formatPrice(product.preco) };
//     //   });
//     //   for (let product in productsFormated){
//     //     console.log(productsFormated[product]);

//     //     return <ProdContainerSingle>
//     //        <img src={productsFormated[product].publicUrl} alt="" />
//     //        <h5>{productsFormated[product].nome}</h5>
//     //        <p>{productsFormated[product].descricao}</p>
//     //        <div className="btn-group-add">
//     //          <span>
//     //            R$<b>{productsFormated[product].preco}</b>
//     //          </span>
//     //          <div className="btn-more">
//     //            <AiOutlinePlus />
//     //          </div>
//     //        </div>
//     //    </ProdContainerSingle>

//     async function loadProducts() {
//       const response = await api.get(`produto/5`);
//       console.log(response.data[0]);
//       const productsFormated = response.data.map(function (product: Product) {
//         return { ...product, preco: formatPrice(product.preco) };
//       });
//       setProducts(productsFormated);
//     }
    
//     loadProducts();
    
//   }, []);

//   function handleAddProduct(id: string) {
//   addProduct(id);
//   }

// const generateTemplate = (posts: any) => posts.map(
//     //generates the content of postsTemplate to add it into DOM
//     (product: any) => {
//     <ProdContainerSingle key={product.id}>
//         <img src={product.publicUrl} alt={product.nome} />
//        <h5>{product.nome}</h5>
//        <p>{product.descricao}</p>
//        <div className="btn-group-add">
//          <span>
//            R$<b>{product.preco}</b>
//          </span>
//          <div className="btn-more"
//         //  onClick={() => handleAddProduct(product.id)}
//          >
//            <AiOutlinePlus />
//          </div>
//        </div>
//    </ProdContainerSingle>
//       }
    
//     ).join('')


  
// // const loading = document.querySelector('.loader')
// let page: number = 1
// const postsContainer: any = document.querySelector('.posts-container')

// const addPostsIntoDom = async (posts: any[]) => {
//   const postsTemplate = generateTemplate(posts)

//   postsContainer.innerHTML += postsTemplate

// }

// const handleScrollToPageBottom = () => {
//   const {clientHeight, scrollHeight, scrollTop} = document.documentElement
//   const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -  10
//   if ( isPageBottomAlmostReached ){
//       showLoading()
//   }
// }
//   const showLoading = () =>{
//       // loading.classList.add('show')
//       removeLoading()
//   }
//   const removeLoading = () =>{
//     setTimeout(() => {
//         // loading.classList.remove('show')
//         getNextPosts()
//     }, 1000)
//   }
  
// const getNextPosts = () =>{
//   setTimeout(() => {//to the it not appear at same time that loader is displayed:
//       page ++
//       addPostsIntoDom(products)
//   }, 300 )//this time is loader's animation time 
// }

// addPostsIntoDom(products)

//   return (
//     <>
//       <Header />
//       <MenuEmpresa />
//       <div className="container">
//         <Recommended>
//           <h4>Recomendados</h4>
//         </Recommended>
//       <GridProdsFour className="posts-container">
      
//       </GridProdsFour>
//       </div>
//       <Footer />
//       <div className="loader"></div>
//     </>
//   );
// }
