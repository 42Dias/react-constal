import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import MenuEmpresa from "../../../components/MenuEmpresa";

export default function Questions() {
  return (
    <>
      <Header />
      <MenuEmpresa />
      <div className="container">
        <CardDatails>
          <h2>Perguntas(3)</h2>
          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Rafael</b> <br />
                Posso pedir para embrulhar para presente?
              </small>
            </ContentDetails>
            <Link to="">Responder</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Rafael</b> <br />
                Posso pedir para embrulhar para presente?
              </small>
            </ContentDetails>
            <Link to="">Responder</Link>
          </CardDatailsContent>

          <CardDatailsContent>
            <ContentDetails>
              <small>
                <b>Rafael</b> <br />
                Posso pedir para embrulhar para presente?
              </small>
            </ContentDetails>
            <Link to="">Responder</Link>
          </CardDatailsContent>
        </CardDatails>
      </div>
    </>
  );
}
