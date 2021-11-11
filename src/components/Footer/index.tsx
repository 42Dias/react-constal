import { FooterContent } from "./styles";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <FooterContent className="footer">
        <div className="container">
          <div className="section-footer">
            <div>
              <Link to=''>Segurança e Privacidade</Link>
              <Link to=''>Sobre a empresa</Link>
              <Link to=''>Contato</Link>
            </div>

            <div>
              <p>
                Av. Fictício, São Paulo - SP <br /> CEP: 12345-67 <br />
                CNPJ: 11111110001{" "}
              </p>
            </div>
          </div>

          <strong>Copyright 2021 Constal Marketplace</strong>
        </div>
      </FooterContent>
    </>
  );
}
