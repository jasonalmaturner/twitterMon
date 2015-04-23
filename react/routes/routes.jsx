import React from 'react';
import { Route } from 'react-router';
import { Main } from './Main';

import { Welcome } from './welcome/Welcome';
import { Register } from './register/Register';
import { Dashboard } from './dashboard/Dashboard';
import { Loading } from './loading/Loading.jsx';

var routes = (
  <Route handler={Main} >
    <Route name="welcome" path="/" handler={Welcome} />
    <Route name="register" handler={Register} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="loading" path="loading/:transition" handler={Loading} />
  </Route>
);

export { routes };
