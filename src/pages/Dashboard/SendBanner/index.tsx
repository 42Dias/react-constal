import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";
import { FiTrash } from "react-icons/fi";

import {
  CardDatails,
  CardDatailsContent,
  ContentDetails,
  SelectInput,
} from "./styles";

export default function SendBanner() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <div className="file">
            <h2>Faça upload</h2>
            <input type="file" name="arquivo" id="arquivo"/>
            <input type="submit" value="Enviar" />
          </div>

          <h2>Banners</h2>

          <SelectInput>
            <select>
              <option>Todos</option>
              <option>Ativas</option>
              <option>Inativas</option>
            </select>
          </SelectInput>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/eletrodomesticos.f2cb79ce.png"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              
              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/moveis.e2d4307e.png"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/materiais.1b6d9340.png "
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              
              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>

          <CardDatailsContent>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <a
                    target="_blank"
                    href="http://7dd208931cad.sn.mynetname.net:42080/constal/static/media/modamasculina.76bf6829.png"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </small>
              </ContentDetails>
            </CardDatailsContent>
            <div className="flex-btn">
              <button>
                <FiTrash />
              </button>

              
              <button>
                <span>Deixar inativa</span>
              </button>
            </div>
          </CardDatailsContent>
        </CardDatails>
      </div>
    </>
  );
}
