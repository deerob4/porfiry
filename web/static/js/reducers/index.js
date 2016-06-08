import { combineReducers } from 'redux';
import api from './api';
import user from './user';
import editor from './editor';
import player from './player';
import sessions from './sessions';
import dialogues from './dialogues';
import quizStatus from './quizStatus';

export default combineReducers({
  api,
  user,
  editor,
  player,
  sessions,
  dialogues,
  quizStatus,
});
