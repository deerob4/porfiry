import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import Lobby from '../views/lobby';
import createSocket from 'actions/SocketActions';

class Root extends Component {
  componentWillMount() {
    const { getState, dispatch } = this.props.store;
    const { socket } = getState().sessions;

    if (!socket) {
      dispatch(createSocket());
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default Root;
