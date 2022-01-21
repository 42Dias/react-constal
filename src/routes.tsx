import { Switch, Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import Accounts from './pages/Accounts/Accounts'
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Produto from './pages/Produto';
import FinishBuy from './pages/FinishBuy';
import PayCart from './pages/PayCart';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Histoty from './pages/History';
import Products from './pages/Products';
import NewProd from './pages/Dashboard/NewProd';
import Promotions from './pages/Dashboard/Promotions';
import PersonalData from './pages/Dashboard/PersonalData';
import Questions from './pages/Dashboard/Questions';
import SaleDetails from './pages/Dashboard/SaleDetails';
import NewPlan from './pages/NewPlan'
import ProductQuery from './pages/ProductQuery'
import Vendas from './pages/Dashboard/Vendas';
import Confirmed from './pages/Dashboard/Confirmed';
import Returned from './pages/Dashboard/Returned';
import Denounced from './pages/Dashboard/Denounced';
import ApproveUsers from './pages/Dashboard/ApproveUsers';
import Companies from './pages/Dashboard/Companies';
import Historic from './pages/Dashboard/Historic';
import Payments from './pages/Dashboard/Payments';
import PaymentsCompanies from './pages/Dashboard/PaymentsCompanies';

const Routes = (): JSX.Element => {
  return (
    <HashRouter>
     <HashRouter basename=''> 
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/meu-perfil" component={Profile} />
        <Route path="/cadastrar" component={Register} />
        <Route exact path="/produto/:id" component={Produto} />
        <Route exact path="/finalizar" component={FinishBuy} />
        <Route exact path="/pagar" component={PayCart} />
        <Route exact path="/favoritos" component={Favorites} />
        <Route exact path="/historico-de-pedidos" component={Histoty} />
        <Route exact path="/produtos" component={Products} />
        <Route exact path="/meus-produtos" component={NewProd} />
        <Route exact path="/promocoes" component={Promotions} />
        <Route exact path="/dados-pessoais" component={PersonalData} />
        <Route exact path="/perguntas" component={Questions} />
        <Route exact path="/detalhes-da-venda" component={SaleDetails} />
        <Route exact path="/novo-plano" component={NewPlan} />
        <Route exact path="/consultar-produtos" component={ProductQuery} />
        <Route exact path="/vendas" component={Vendas} />
        <Route exact path="/confirmadas" component={Confirmed} />
        <Route exact path="/devolvidas" component={Returned} />
        <Route exact path="/denunciadas" component={Denounced} />
        <Route exact path="/aprovar-usuarios" component={ApproveUsers} />
        <Route exact path="/empresas" component={Companies} />
        <Route exact path="/historico" component={Historic} />
        <Route exact path="/pagamentos" component={Payments} />
        <Route exact path="/pagamentos-empresas" component={PaymentsCompanies} />
        <Route exact path="/contas" component={Accounts} />
      </HashRouter>
    </HashRouter>
  );
};

export default Routes;
