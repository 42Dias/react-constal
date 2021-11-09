import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiSearch,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import logo from "../../assets/images/logo.png";
import {
  ModalContainer,
  Container,
  Cart,
  InputCenter,
  IconsContainer,
  FlexLink,
  ModalEnter,
  Form,
} from "./styles";

import React from "react";

import { useCart } from "../../hooks/useCart";

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Container>
        <Link to="/">
          <img src={logo} alt="Constal" />
        </Link>

        <InputCenter>
          <input type="text" placeholder="Pesquise o seu produto" />
          <button type="button">
            <FiSearch />
          </button>
        </InputCenter>

        <IconsContainer>
          <FiUser onClick={openModal} size={20} color="black" />
          <FiHeart size={20} color="black" />
          <Cart to="/cart">
            <div>
              <strong>Meu carrinho</strong>
              <span data-testid="cart-size">
                {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
              </span>
            </div>
            <FiShoppingBag size={20} color="black" />
          </Cart>
        </IconsContainer>
      </Container>

      <Container>
        <FlexLink>
          <Link to="">
            Madeira <FiChevronRight />
          </Link>
          <Link to="">
            Tinta <FiChevronRight />
          </Link>
          <Link to="">
            Portas e Janelas <FiChevronRight />
          </Link>
          <Link to="">
            Telha <FiChevronRight />
          </Link>
          <Link to="">
            Pisos <FiChevronRight />
          </Link>
          <Link to="">
            Ferramentas <FiChevronRight />
          </Link>
        </FlexLink>
      </Container>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
      >
        <ModalContainer>
          <ModalEnter>
            <h2>Insira os seus dados</h2>
            <FiX size={20} onClick={closeModal} />
          </ModalEnter>
          <Form>
            <label htmlFor="user">E-mail*</label>
            <input type="text" id="user" placeholder="Digite o seu e-mail" />
            <label htmlFor="senha">Senha*</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite a sua senha"
            />

            <Link to="" className="btn-enter" href="">
              Entrar
            </Link>

            <div className="contentBorder">
              <div className="border" />
              <p>ou</p>
              <div className="border" />
            </div>

            <Link to="" className="btn-register" href="">
              Cadastrar
            </Link>
          </Form>

          <strong>
            Esqueceu a senha?
            <Link to="" href="">
              Clique aqui
            </Link>
          </strong>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Header;
