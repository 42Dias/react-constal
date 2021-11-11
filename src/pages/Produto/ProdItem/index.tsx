import {
  DetailsProdFirts,
  ContainerProd,
  BoxProd,
  IconsContentStar,
  BoxColors,
  ColorWhite,
  ColorBlack,
  ColorRed,
} from "./styles";
import { AiFillStar } from "react-icons/ai";
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
              <span>Nome da marca</span>
              <strong>{props.repository.title}</strong>
              <span>Nome da marca</span>
              <IconsContentStar>
                <AiFillStar size={18} />
                <AiFillStar size={18} />
                <AiFillStar size={18} />
                <AiFillStar size={18} />
                <AiFillStar size={18} />
                <small>(1)</small>
              </IconsContentStar>
              <br />
              <strong>{props.repository.price}</strong>
              <span>Variantes (ex: Cor)</span>
              <BoxColors>
                <ColorWhite />
                <ColorBlack />
                <ColorRed />
              </BoxColors>
            </BoxProd>

            <BoxProd>
              <strong>{props.repository.name}</strong>
              <strong>{props.repository.title}</strong>
              <strong>{props.repository.price}</strong>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>
      </div>
    </>
  );
}
