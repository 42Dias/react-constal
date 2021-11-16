import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
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

const Routes = (): JSX.Element => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default Routes;
