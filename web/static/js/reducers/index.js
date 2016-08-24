import { combineReducers } from 'redux';
import api from './api';
import user from './user';
import editor from './editor';
import question from './question';
import sessions from './sessions';
import dialogues from './dialogues';
import countdown from './countdown';
import quizStatus from './quizStatus';

export default combineReducers({
  api,
  user,
  editor,
  sessions,
  dialogues,
  quizStatus,
  player: combineReducers({ question, countdown }),
});
