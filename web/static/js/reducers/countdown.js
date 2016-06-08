import * as constants from '../constants';
import { combineReducers } from 'redux';

const countdownState = {
  id: null,
  startDate: null,
  remaining: {}
};

function countdown(state = countdownState, action) {
  switch (action.type) {
    case constants.BEGIN_COUNTDOWN:
      return {
        ...state,
        id: action.payload.quizId,
        startDate: action.payload.startDate
      };

    case constants.UPDATE_COUNTDOWN:
      return { ...state, remaining: action.payload };

    default:
      return state;
  }
}

export default countdown;
