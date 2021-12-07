import { createContext, ReactNode, useContext, useState } from 'react';
import axios from 'axios';

export default function useInfiniteScroll(number: number){

	let token = localStorage.getItem("token")?.replace(/"/g, "");
	axios({
	  baseURL: 'http://localhost:8157/api/produto/:id',
	  method: 'GET',
	  timeout: 50000
	  // ,headers: {'Authorization': 'Bearer '+ token} // não é necessária autenticação
	  //possível params para pesquisa

	}).then(res => {
		console.log(res.data)
	}
	)

}