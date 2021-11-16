import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { RepositoryItem } from "./ProdItem";
// import { useHistory } from "react-router";
// import { api } from "../../services/api";

interface Repository {
  id: string,
  name: string,
  title: string,
  price: string,
  image: string
}

export default function Produto() {

    const [repositories, setRepositories] = useState<Repository[]>([]);
    useEffect(() => {
      fetch('http://dev.42dias.com.br/Clientes/constal/APIS/APISincronizarSistema3.php')
        .then(response => response.json())
        .then(data => setRepositories(data))
    }, []);
    return (
      <>
        <Header />
          <div className="container">              
            {repositories.map(repository => {
              return (
                <RepositoryItem key={repository.id} repository={repository} />
              )
            })}
          </div>
        <Footer />
      </>
    );
  
}
