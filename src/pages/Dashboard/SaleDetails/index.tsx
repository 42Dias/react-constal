import { CardDatails, CardDatailsContent, ContentDetails } from "./styles";

import Header from "../../../components/Header";
import item from "../../../assets/images/prodfav.png";
import { Link } from "react-router-dom";
import { Menu } from "../../../components/Menu";

export default function SaleDetails() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <CardDatails>
          <h2>Detalhes da venda</h2>

          <CardDatailsContent>
            <ContentDetails>
              <img src={item} alt="" />
              <span>Headset Preto</span>
            </ContentDetails>
            <p>R$ 999,99</p>
          </CardDatailsContent>

          <CardDatails>
            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Nome do cliente</b> <br />
                  CPF: XXXX <br />
                  Metodo de pagamento: XXXXXX <br />
                  Parcelamento: XX
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Entrega</b> <br />
                  Endereço de destino: Rua, Número, Bairro, CEP <br />
                  Complemento: XXXX <br />
                  Cidade/Estado
                </small>
              </ContentDetails>
            </CardDatailsContent>

            <CardDatailsContent>
              <ContentDetails>
                <small>
                  <b>Detalhes</b> <br />
                  Data de solicitação da compra:  00/00/0000 <br />
                  Produto R$ 00,00 <br />
                  Envio R$ 00,00 <br />
                  <b>Total: R$ 00,00</b>
                </small>
              </ContentDetails>
            </CardDatailsContent>
          </CardDatails>
        </CardDatails>
      </div>
    </>
  );
}
