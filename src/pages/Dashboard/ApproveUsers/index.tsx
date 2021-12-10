import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";
import { Menu } from "../../../components/Menu";

export default function ApproveUsers() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Aprovar usuários</h2>
          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Nome do user</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Nome do user</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Nome do user</b><br />
                CPF: XXXXXXXXXX <br />
                Telefone: XXXXXXX <br />
                E-mail: XXXXXXXXX
              </small>
            </ContentDetails>
            <div className="flex-btn">
              <Link to="">Recusar</Link>
              <Link to="">Aprovar</Link>
            </div>
          </CardDatailsContent>
        </CardDatails>
      </div>
    </>
  );
}
