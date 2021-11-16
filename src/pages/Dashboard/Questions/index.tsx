import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import MenuAdm from "../../../components/MenuAdm";
import { Link } from "react-router-dom";

export default function Questions() {
  return (
    <>
      <Header />
      <MenuAdm />
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
