import React from 'react';
import { IndexRoute, Route } from 'react-router';
import MainLayout from 'layouts/main';
import LoginView from 'views/login';
import CreateView from 'views/create';

export default (
  <Route component={MainLayout}>
    <Route path="/" component={LoginView} />
    <Route path="/create" component={CreateView} />
    <Route path="/play" />
  </Route>
);
