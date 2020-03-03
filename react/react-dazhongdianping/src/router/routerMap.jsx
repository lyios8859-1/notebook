import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import NoMatch from '../components/NotFound/404.jsx';
import Home from '../containers/Home/home.jsx';
import About from '../containers/About/about.jsx';
import Users from '../containers/Users/users.jsx';

import Details from '../containers/Details/details.jsx';

class RouteMap extends Component {

  updateHandle() {
    console.log('每次路由变化后都触发');
  }

  render() {
     return (
      <BrowserRouter basename='/'>
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/details/34">Details</Link>
            </li>
            <li>
              <Link to="/also/will/not/match">NotMatch</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path='/details/:id'>
            <Details/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }

}

export default RouteMap;
