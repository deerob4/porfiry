import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import createSocket from 'actions/SocketActions';

class Root extends Component {
  _renderRouter() {
    // PROBABLY VERY BAD...FIX THIS
    this.props.store.dispatch(createSocket());
    return (
      <Router history={this.props.routerHistory}>
        {routes}
      </Router>
    );
  }

  render() {
    return (
      <Provider store={this.props.store}>
        {this._renderRouter()}
      </Provider>
    );
  }
}

export default Root;
