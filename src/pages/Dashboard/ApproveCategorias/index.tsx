import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../components/Header";
import { Menu } from "../../../components/Menu";
import { api, role, ip, status } from "../../../services/api";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";


export default function ApproveCategorias() {
  const [categoria = [], setCategoria] = useState<any[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


  async function loadCategoria() {
    setLoading(true);
    const response = await api.get('categoria?filter%5Bstatus%5D=pendente')
      .then(response => {
        setLoading(false);
        return response.data;
      })
      setCategoria(response.rows)
    console.log("Categoria");
    console.log(response.rows);
  }

  useEffect(() => {
    if(!role){
      //window.location.reload()
    }
    else{
    if(role !== "admin" && role !== "empresa" || status === "pendente"){
      // Simulate an HTTP redirect:
      window.location.replace(`${ip}/#/erro`);
    }
  }
    loadCategoria();

  }, []);

  function messageCancel() {
    toast.info('Ainda não implementado')
    setIsOpen(false);
  }
  function aprovarCategoria(categoria: any) {
    console.log(categoria)
    categoria.status = "aprovado";
    setLoading2(true)
    let response = api.put('categoria/' + categoria.id, {
      id: categoria.id,
      data: categoria,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Categoria aprovada com sucesso! :)');
        //window.location.reload();
        setLoading2(false)
        loadCategoria();
      }else{
        toast.error('Ops, não foi possivel aprovar a categoria! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel aprovar a categoria! :(');
      console.log(error)
    })
  }
  function recusarCategoria(categoria: any) {
    console.log(categoria)
    categoria.status = "inative";
    setLoading(true)
    let response = api.put('categoria/' + categoria.id, {
      id: categoria.id,
      data: categoria,
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {
        toast.info('Categoria recusado com sucesso! :)');
        //window.location.reload();
        setLoading(false)
        loadCategoria()
      }else{
        toast.error('Ops, não foi possivel recusado a categoria! :(');
      }
    }).catch((error)=>{
      toast.error('Ops, não foi possivel recusado a categoria! :(');
      console.log(error)
    })
  }
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Aprovar Categorias {loading ? <img width="40px" style={{margin: 'auto'}} height="" src={'https://contribua.org/mb-static/images/loading.gif'} alt="Loading" /> : false}</h2>
          
          {
            categoria.length === 0 ? (
              <p>Todas as categorias ja foram aprovadas</p>
            ) : (
            categoria.map((categoria) => (
              <CardDatailsContent>
                <CardDatailsContent key={categoria.id}>
                  <ContentDetails>
                    <small>
                      <b>Categoria: {categoria.nome} </b><br />
                    </small>
                  </ContentDetails>
                </CardDatailsContent>
                
                <div className="flex-btn">
                  <Link to="/aprovar-categorias" onClick={() => recusarCategoria(categoria)}>Recusar</Link>
                  <Link to="/aprovar-categorias" onClick={() => aprovarCategoria(categoria)}>Aprovar</Link>
                </div>
              </CardDatailsContent>
            ))
            )
          }
        </CardDatails>
      </div>
    </>
  );
}


