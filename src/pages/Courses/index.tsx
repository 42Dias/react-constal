import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AiOutlinePlus } from "react-icons/ai";
import { Recommended, GridProdsFour, ProdContainerSingle } from "./styles";
import MenuCliente from "../../components/MenuCliente";
import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <>
      <Header />
      <MenuCliente />
      <div className="container">
        <Recommended>
          <h4>Cursos recomendados</h4>
        </Recommended>

        <GridProdsFour>
          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://famesp.com.br/wp-content/uploads/2016/04/administracao-curso-tecnico-famesp.jpg" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://manole.vteximg.com.br/arquivos/ids/257936-1000-1000/NUTROLOGIA-POST.jpg" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://s3-sa-east-1.amazonaws.com/lets.events-production/events/photos/e34/cc1/7b-/cover/data?1581020507" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBsAMkxW_KQwY_OfSHh47tGmlEi-XwL17cHZUnbcR6hNPT3XYpQRzz3uEp2ZDcxlSjf2Q&usqp=CAU" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://media.graphcms.com/qPw8u5DXS5usM849nO1z" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm5mepFbmQNpC4bkjhirLZPm8kZY-feDsQNA&usqp=CAU" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://famesp.com.br/wp-content/uploads/2016/01/design-interiores-curso-tecnico-famesp.jpg" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>

          <ProdContainerSingle>
            <Link to="/cursos-id"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6rD40Lm3x0Iya4_G1hb3kRjquwR39uzsA&usqp=CAU" alt="" /></Link>
            <h5>Nome do produto</h5>
            <p>Descrição do produto com especificações técnicas</p>
            <div className="btn-group-add">
              <span>
                R$<b>219,99</b>
              </span>
              <div className="btn-more">
                <AiOutlinePlus />
              </div>
            </div>
          </ProdContainerSingle>
        </GridProdsFour>
      </div>
      <Footer />
    </>
  );
}
