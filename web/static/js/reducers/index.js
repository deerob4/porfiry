import { combineReducers } from 'redux';
import api from './api';
import user from './user';
import quiz from './quiz';
import dialogues from './dialogues';

export default combineReducers({
  api,
  quiz,
  user,
  dialogues,
});
