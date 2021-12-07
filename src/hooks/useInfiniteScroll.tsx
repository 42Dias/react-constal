import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function useInfiniteScroll(number: number){

  const [products = [], setProducts] = useState<ProductFormatted[]>([]);

  const [loading, setLoading] = useState(false)

  const [hasMore, setHasMore] = useState(false) // feito para quando não há mais resultados para pesquisa

  

	useEffect(() => {
	setLoading(true)


	//let token = localStorage.getItem("token")?.replace(/"/g, "");
	axios({
	  baseURL: 'http://localhost:8157/api/produto/' + number,
	  method: 'GET',
	  timeout: 50000
	  // ,headers: {'Authorization': 'Bearer '+ token} // não é necessária autenticação
	  //possível params para pesquisa

	}).then(res => {
	   setProducts(prevProducts => {
	   	console.log([...prevProducts, ...res.data])
	   	return [...prevProducts, ...res.data]
   	    setHasMore(true)	
	   })
			setLoading(false)
	}
	)
	}, [number] )
	return { loading, products, hasMore }

}