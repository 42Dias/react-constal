import {
  DetailsProdFirts,
  ContainerProd,
  BoxProd,
  IconsContentStar,
  AddCartRight,
  BoxProdFirts,
} from "./styles";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import React from "react";
import MenuCliente from "../../components/MenuCliente";
import Header from "../../components/Header";

interface RepositoryItemProps {
  repository: {
    id: string;
    name: string;
    title: string;
    price: string;
    image: string;
  };
}

export default function CoursesPage(props: RepositoryItemProps) {

  return (
    <>
      <Header />
      <MenuCliente />
      <div className="container">
        <ContainerProd>
          <img src="https://repository-images.githubusercontent.com/349411927/39e29500-897d-11eb-9967-8f72695e2483" alt="" />
          <DetailsProdFirts>
            <BoxProd>
              <BoxProdFirts>
                <span>Nome da marca</span>
                <strong>Curso de desenvolvimento</strong>
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
                <strong>R$ 89,99</strong>
              </BoxProdFirts>

              <AddCartRight>
                <a target="_blank" href="https://www.youtube.com">Adicionar</a>
              </AddCartRight>
            </BoxProd>

            <BoxProd>
              <div className="descprod">
                <strong>Descrição do produto</strong>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </BoxProd>
          </DetailsProdFirts>
        </ContainerProd>
      </div>
    </>
  );
}
