import React from 'react';
import { Route } from 'react-router';
import { Main } from './Main';

import { Welcome } from './welcome/Welcome';
import { Register } from './register/Register';
import { Dashboard } from './dashboard/Dashboard';
import { Loading } from './loading/Loading';
import { Initiate } from './initiate/Initiate';

var routes = (
  <Route handler={Main} >
    <Route name="welcome" path="/" handler={Welcome} />
    <Route name="register" handler={Register} />
    <Route name="dashboard" path="dashboard/:id" handler={Dashboard} />
    <Route name="loading" path="loading/:transition" handler={Loading} />
    <Route name="initiate" handler={Initiate} />
  </Route>
);

export { routes };
