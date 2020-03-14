import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import routes from './routers.jsx';

const BasicRoute = () => {
  return (
  <HashRouter>
    <Switch>
        {
          routes.map((route, index) => <Route key={index} exact {...route} />)
        }
        <Route render={() => <h1 className={''}>404</h1>} />
    </Switch>
  </HashRouter>)
};


export default BasicRoute;