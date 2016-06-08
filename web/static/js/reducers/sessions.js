import * as constants from '../constants';

const initalState = {
  socket: null,
  lobbyChannel: null,
  editorChannel: null,
  quizChannel: null
};

function socket(state = initalState, action) {
  switch (action.type) {
    case constants.CREATE_SOCKET:
      return { ...state, socket: action.payload};

    case constants.CONNECT_TO_LOBBY:
      return { ...state, lobbyChannel: action.payload };

    case constants.LEAVE_LOBBY:
      return { ...state, lobbyChannel: null };

    case constants.CONNECT_TO_EDITOR:
      return { ...state, editorChannel: action.payload };

    case constants.LEAVE_EDITOR:
      return { ...state, editorChannel: null };

    case constants.CONNECT_TO_QUIZ:
      return { ...state, quizChannel: action.payload.channel };

    case constants.LEAVE_QUIZ:
      return { ...state, quizChannel: null };

    default:
      return state;
  }
}

export default socket;
