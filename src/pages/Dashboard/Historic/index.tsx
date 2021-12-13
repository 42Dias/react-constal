import Header from "../../../components/Header";
import item from "../../../assets/images/prodfav.png";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";

export default function Historic() {
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
