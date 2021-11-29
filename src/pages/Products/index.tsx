import Header from "../../components/Header";
import Footer from "../../components/Footer";
import prodone from "../../assets/images/prodone.png";
import prodtwo from "../../assets/images/prodtwo.png";
import prodthree from "../../assets/images/prodthree.png";
import prodfour from "../../assets/images/prodfour.png";
import { AiOutlinePlus } from "react-icons/ai";
import { Recommended, GridProdsFour, ProdContainerSingle } from "./styles";
import MenuCliente from "../../components/MenuCliente";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <>
      <Header />
      <MenuCliente />
      <div className="container">
        <Recommended>
          <h4>Recomendados</h4>
        </Recommended>

        <GridProdsFour>
          <ProdContainerSingle>
            <Link to="/"><img src={prodone} alt="" /></Link>
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
            <Link to="/"><img src={prodtwo} alt="" /></Link>
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
            <Link to="/"><img src={prodthree} alt="" /></Link>
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
            <Link to="/"><img src={prodfour} alt="" /></Link>
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
            <Link to="/"><img src={prodone} alt="" /></Link>
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
            <Link to="/"><img src={prodtwo} alt="" /></Link>
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
            <Link to="/"><img src={prodthree} alt="" /></Link>
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
            <Link to="/"><img src={prodfour} alt="" /></Link>
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
