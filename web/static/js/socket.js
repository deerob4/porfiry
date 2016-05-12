const Phoenix = require('./phoenix');

const socket = new Phoenix.Socket('/socket');

socket.connect();

export default socket;
