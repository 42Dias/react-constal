import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Produto from './pages/Produto';
import Signature from './pages/Signature';
import Error from './pages/Error';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/meu-perfil" component={Profile} />
      <Route exact path="/produto/:id" component={Produto} />
      <Route path="/assinatura" component={Signature} />
      <Route path="*" component={Error} />
    </Switch>
  );
};

export default Routes;
