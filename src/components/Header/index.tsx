import { Link } from "react-router-dom";
import { FiShoppingBag, FiUser, FiHeart, FiSearch } from "react-icons/fi";

import logo from "../../assets/images/logo.png";
import { Container, Cart, InputCenter, IconsContainer } from "./styles";
import { useCart } from "../../hooks/useCart";

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <InputCenter>
        <input type="text" placeholder="Pesquise o seu produto" />
        <button type="button"><FiSearch /></button>
      </InputCenter>

      <IconsContainer>
        <FiUser size={20} color="black" />
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
  );
};

export default Header;
