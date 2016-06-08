import React from 'react';
import { IndexRoute, Route } from 'react-router';
import MainLayout from 'layouts/main';
import LobbyView from 'views/lobby';
import CreateView from 'views/create';
import PlayView from 'views/play';

export default (
  <Route component={MainLayout}>
    <Route path="/" component={LobbyView} />
    <Route path="/create" component={CreateView} />
    <Route path="/play" component={PlayView} />
  </Route>
);
