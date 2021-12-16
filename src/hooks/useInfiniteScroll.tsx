import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api';


export default function useInfiniteScroll(number: number){

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

  const [loading, setLoading] = useState(false)

  const [hasMore, setHasMore] = useState(false) // feito para quando não há mais resultados para pesquisa

  

	useEffect(() => {
	setLoading(true)

	axios({
		method: 'GET',
	  url: `http://${api}:8157/api/produto/${number}`,
	  timeout: 50000

	}).then(res => {
 		 console.log("res.data")
		 console.log(res.data)
	   setProducts(prevProducts => {
	   		return [...new Set([...prevProducts, ...res.data])]	
	   	   })
 	  	console.log("products")	
	  	console.log(products)
			setLoading(false)
			setHasMore(res.data.length!==0)
			// setHasMore(true)
		console.log(res)
	}
	).catch(error => console.log(error))
	}, [number] )
	return { loading, products, hasMore }

}