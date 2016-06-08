import * as constants from '../constants';
import { combineReducers } from 'redux';

function settingsAreOpen(state = false, action) {
  switch (action.type) {
    case constants.OPEN_SETTINGS_DIALOG:
      return true;

    case constants.CLOSE_SETTINGS_DIALOG:
      return false;

    default:
      return state;
  }
}

function loadQuizIsOpen(state = false, action) {
  switch (action.type) {
    case constants.OPEN_LOAD_QUIZ_DIALOG:
      return true;

    case constants.CLOSE_LOAD_QUIZ_DIALOG:
      return false;

    default:
      return state;
  }
}

function scheduleQuizIsOpen(state = false, action) {
  switch (action.type) {
    case constants.OPEN_SCHEDULE_QUIZ_DIALOG:
      return true;

    case constants.CLOSE_SCHEDULE_QUIZ_DIALOG:
      return false;

    default:
      return state;
  }
}

function loadedQuizzes(state = [], action) {
  switch (action.type) {
    case constants.RECEIVE_QUIZZES:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  loadedQuizzes,
  loadQuizIsOpen,
  settingsAreOpen,
  scheduleQuizIsOpen,
});
