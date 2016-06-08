import { CREATE_SOCKET } from '../constants';

const Phoenix = require('../phoenix');

const createSocket = () => {
  return dispatch => {
    const socket = new Phoenix.Socket('/socket');

    socket.connect();

    dispatch({
      type: CREATE_SOCKET,
      payload: socket
    });
  };
};

export default createSocket;
