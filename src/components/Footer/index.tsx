import {
  FooterContent,
  GridFooter,
  ModalContainer,
  ModalEnter,
} from "./styles";
import logo from "../../assets/images/logo.png";
import Modal from "react-modal";

import { Link } from "react-router-dom";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Footer() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <FooterContent className="footer">
        <div className="container">
          <GridFooter>
            <div>
              <img src={logo} alt="Constal" />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

            <div>
              <h4>Ajuda</h4>
              <p style={{ cursor: "pointer" }} onClick={openModal}>
                Segurança e Privacidade
              </p>
              <p>Contato: (12) 9 99797-2034</p>
            </div>
            <div>
              <h4>Endereço</h4>
              <p>Rua Bandeirantes, nº 108 - Sala 03, Centro. Porto Feliz/SP</p>
              <p>
                CNPJ: 43.561.341/0001-49 <br />
                CEP: 18.540-000
              </p>
            </div>
          </GridFooter>

          <h5>Todos os direitos reservados a ConstalShop</h5>
        </div>
      </FooterContent>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {/* <ModalContainer> */}
          <ModalEnter>
            <h2>Segurança e Privacidade</h2>
            <FiX size={20} onClick={closeModal} />
          </ModalEnter>

          <p>
            A Política de Privacidade Online foi criada para reafirmar o nosso
            compromisso com a sua segurança e privacidade. Como esta política
            pode ser atualizada, recomendamos que ela seja consultada
            periodicamente. <br />
            Você pode visitar nosso site e conhecer os produtos, conferir nossas
            promoções, ler matérias e textos em geral, sem precisar fornecer
            nenhuma informação pessoal. Mas, caso exista essa necessidade, esta
            política procura esclarecer como coletamos e tratamos seus dados.{" "}
            <br />
            1. Qualquer informação fornecida pelos usuários será coletada e
            guardada de acordo com os mais rígidos padrões de segurança e
            confiabilidade; <br />
            2. Todas as informações coletadas dos usuários trafegam utilizando
            processo de criptografia padrão da Internet;
            <br />
            3. As informações pessoais que nos forem fornecidas pelos usuários
            serão coletadas por meios éticos e legais. Essa coleta poderá ter um
            ou mais propósitos, sobre os quais nossos usuários serão informados;
            <br />
            4. Os usuários serão avisados sobre a coleta dos dados e sobre as
            consequências de sua decisão, ficando ao seu critério fornecê-los ou
            não;
            <br />
            5. A menos que tenhamos determinação legal ou judicial, as
            informações dos usuários jamais serão transferidas a terceiros ou
            usadas para finalidades diferentes daquelas para as quais foram
            coletadas;
            <br />
            6. O acesso às informações coletadas está restrito a funcionários
            autorizados, para o uso adequado desses dados. Os funcionários que
            se utilizarem indevidamente dessas informações, ferindo nossa
            Política de Privacidade, estarão sujeitos às penalidades previstas
            em nosso processo disciplinar;
            <br />
            7. Manteremos a integridade das informações que nos forem
            fornecidas;
            <br />
            8. Nossos sites contêm links para outros sites externos, cujos
            conteúdos e políticas de privacidade não são de responsabilidade da
            ClickModa. Nós não temos acesso às informações coletadas por
            "cookies" (*) presentes nesses sites;
            <br />
            9. Será exigida, de toda organização contratada para prover serviços
            de apoio, o cumprimento aos nossos padrões de privacidade e
            segurança da informação;
            <br />
            10. Para fins de operações de crédito e gerenciamento de riscos,
            poderemos trocar informações sobre nossos clientes com fontes
            respeitáveis de referência, órgãos reguladores e serviços de
            compensação;
            <br />
            11. Eventualmente, poderemos utilizar cookies (*) para confirmar
            identidade do cliente, personalizar o acesso e acompanhar a
            utilização de nosso website, visando o aprimoramento da navegação e
            funcionalidade.
            <br />
            12. Colocamos à disposição de nossos usuários canais de atendimento
            ao cliente, para esclarecer qualquer dúvida que possa surgir.
            <br />
            (*)Cookies não armazenam informações pessoais sem que o usuário as
            tenha fornecido e não coletam informações registradas em seu
            computador.
            <br />A maioria dos browsers possibilita que o usuário, a qualquer
            instante, ative mecanismos para informá-lo quando os cookies
            estiverem acionados, ou para evitar seu acionamento, embora isso
            possa afetar a utilização de algumas funções dos sites.
          </p>
        {/* </ModalContainer> */}
      </Modal>
    </>
  );
}
