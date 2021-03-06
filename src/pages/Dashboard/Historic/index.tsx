import Header from "../../../components/Header";
import item from "../../../assets/images/prodfav.png";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";
import { useEffect } from "react";
import { ip, role, status } from "../../../services/api";

export default function Historic() {

  useEffect(
    ()=>{
      if(!role){
        window.location.reload()
      }
      else{
        if(role !== "admin" && role !== "empresa" || status === "pendente"){
          // Simulate an HTTP redirect:
          window.location.replace(`${ip}/#/erro`);
        }
      }
  
    }
    ,[]
  )
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Histórico</h2>
          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <small>
                <b>Nome da empresa</b>
                <br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <Link to="/detalhes-da-venda">Detalhes</Link>

          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <small>
                <b>Nome da empresa</b>
                <br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <Link to="/detalhes-da-venda">Detalhes</Link>

          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <small>
                <b>Nome da empresa</b>
                <br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <Link to="/detalhes-da-venda">Detalhes</Link>

          </CardDatailsContent>
        </CardDatails>
      </div>
    </>
  );
}
