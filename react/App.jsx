import React from 'react';
import Router from 'react-router';
import { routes } from './routes/routes';

Router.run(routes, function(Handler, state){
  React.render(<Handler {...state} />, document.getElementById("app"));
});
