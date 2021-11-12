import {
  DetailsProdFirts,
  ContainerProd,
  BoxProd,
  IconsContentStar,
  BoxColors,
  ColorWhite,
  ColorBlack,
  ColorRed,
  AddCartRight,
  BoxProdFirts,
  FlexBtnsProd,
  IconPlusMinus,
  ProdSecond,
} from "./styles";
import { AiFillStar } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
interface RepositoryItemProps {
  repository: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
  };
}

export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <>
      <div className="container">
        <ContainerProd>
          <img src={props.repository.image} alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                <span>Nome da marca</span>
                <strong>{props.repository.title}</strong>
                <span>Código do produto</span>
                <IconsContentStar>
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <AiFillStar size={18} />
                  <small>(1)</small>
                </IconsContentStar>
                <br />
                <strong>R$ {props.repository.price}</strong>
                <span>Variantes (ex: Cor)</span>
                <BoxColors>
                  <ColorWhite />
                  <ColorBlack />
                  <ColorRed />
                </BoxColors>
              </BoxProdFirts>

              <AddCartRight>
                <FlexBtnsProd>
                  <IconPlusMinus>
                    <FiPlus />
                  </IconPlusMinus>
                  <h3>4</h3>
                  <IconPlusMinus>
                    <FiMinus />
                  </IconPlusMinus>
                </FlexBtnsProd>
                <Link to="#">Adicionar</Link>
              </AddCartRight>
            </BoxProd>

            <BoxProd>
              <div className="oi">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>

                <strong>Descrição técnica</strong>

                <span>
                  Marca: <br />
                  Modelo: <br />
                  Material: <br />
                  Características: <br />
                  Observações: <br />
                  Acabamento: <br />
                </span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>

        <ProdSecond>
          <div>
            <h2>Nome do cliente</h2>
            <span>Posso pedir para embrulhar para presente?</span>
          </div>

          <Link to="#">Responder</Link>
        </ProdSecond>
      </div>
    </>
  );
}
