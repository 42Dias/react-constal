import { Switch, Route, HashRouter } from "react-router-dom";

import Accounts from './pages/Accounts/Accounts'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Produto from "./pages/Produto";
import FinishBuy from "./pages/FinishBuy";
import PayCart from "./pages/PayCart";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Histoty from "./pages/History";
import Products from "./pages/Products";
import ProductsSearch from "./pages/ProductsSearch";
import NewProd from "./pages/Dashboard/NewProd";
import Promotions from "./pages/Dashboard/Promotions";
import PersonalData from "./pages/Dashboard/PersonalData";
import Questions from "./pages/Dashboard/Questions";
import SaleDetails from "./pages/Dashboard/SaleDetails";
import NewPlan from "./pages/NewPlan";
import ProductsCategory from "./pages/ProductsCategory";
import ProductsPromotions from "./pages/ProductsPromotions";
import ProductQuery from "./pages/ProductQuery";
import Vendas from "./pages/Dashboard/Vendas";
import Confirmed from "./pages/Dashboard/Confirmed";
import Returned from "./pages/Dashboard/Returned";
import Denounced from "./pages/Dashboard/Denounced";
import ApproveUsers from "./pages/Dashboard/ApproveUsers";
import Companies from "./pages/Dashboard/Companies";
import Historic from "./pages/Dashboard/Historic";
import Payments from "./pages/Dashboard/Payments";
import PaymentsCompanies from "./pages/Dashboard/PaymentsCompanies";
import Courses from "./pages/Courses";
import CoursesPage from "./pages/CoursesPage";
import Signature from "./pages/Signature";
import Error from "./pages/Error";
import CheckEmail from "./pages/CheckEmail";
import ApproveCategorias from "./pages/Dashboard/ApproveCategorias";
import ApproveEmpresas from "./pages/Dashboard/ApproveEmpresas";
import ResetarSenha from "./pages/Dashboard/ResetarSenha";
import SendBanner from "./pages/Dashboard/SendBanner";
import categoryAdmin from "./pages/Dashboard/categoryAdmin";
import SendTermo from "./pages/Dashboard/SendTermo";
import SendData from "./pages/SendData";

import MyPaymentInfo from "./pages/MyPaymentInfo/MyPaymentInfo";


const Routes = (): JSX.Element => {
  return (
    <HashRouter>
    <HashRouter basename=''>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/meu-perfil/:token" component={Profile} />
      <Route path="/cadastrar" component={Register} />
      <Route exact path="/produto/:id" component={Produto} />
      <Route exact path="/produtos-promocao/:id" component={ProductsPromotions} />
      <Route exact path="/produto-categoria/:id" component={ProductsCategory} />
      <Route exact path="/finalizar" component={FinishBuy} />
      <Route exact path="/pagar" component={PayCart} />
      <Route exact path="/favoritos" component={Favorites} />
      <Route exact path="/historico-de-pedidos" component={Histoty} />
      <Route exact path="/produtos" component={Products} />
      <Route exact path="/produtos/:query" component={ProductsSearch} />
      <Route exact path="/meus-produtos" component={NewProd} />
      <Route exact path="/promocoes" component={Promotions} />
      <Route exact path="/dados-pessoais" component={PersonalData} />
      <Route exact path="/perguntas" component={Questions} />
      <Route exact path="/resetar-senha/:token" component={ResetarSenha} />
      <Route exact path="/detalhes-da-venda/:id" component={SaleDetails} />
      <Route exact path="/novo-plano" component={NewPlan} />
      <Route exact path="/consultar-produtos" component={ProductQuery} />
      <Route exact path="/vendas" component={Vendas} />
      <Route exact path="/confirmadas" component={Confirmed} />
      <Route exact path="/devolvidas" component={Returned} />
      <Route exact path="/denunciadas" component={Denounced} />
      <Route exact path="/confirmadas/:id" component={Confirmed} />
      <Route exact path="/devolvidas/:id" component={Returned} />
      <Route exact path="/denunciadas/:id" component={Denounced} />
      <Route exact path="/aprovar-usuarios" component={ApproveUsers} />
      <Route exact path="/aprovar-empresas" component={ApproveEmpresas} />
      <Route exact path="/aprovar-categorias" component={ApproveCategorias} />
      <Route exact path="/empresas" component={Companies} />
      <Route exact path="/historico" component={Historic} />
      <Route exact path="/pagamentos" component={Payments} />
      <Route exact path="/cursos" component={Courses} />
      <Route exact path="/cursos-id" component={CoursesPage} />
      <Route exact path="/erro" component={Error} />
      <Route exact path="/assinaturas" component={Signature} />
      <Route exact path="/checar-email/:id" component={CheckEmail} />
      <Route exact path="/enviar-banner" component={SendBanner} />
      <Route exact path="/enviar-termos" component={SendTermo} />
      <Route exact path="/enviar-dados" component={SendData} />
      <Route exact path="/categorias-fixar" component={categoryAdmin} />
      <Route exact path="/contas" component={Accounts} />
      <Route exact path="/cartoes" component={MyPaymentInfo} />

      <Route
        exact
        path="/pagamentos-empresas"
        component={PaymentsCompanies}
      />
    </Switch>
    </HashRouter>
  </HashRouter>
  );
};

export default Routes;
