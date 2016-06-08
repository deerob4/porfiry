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

const quizState = {
  question: 'Who is the current Queen of England?',
  answers: [{body: 'hey'}, {body: 'you'}, {body: 'pikachu'}],
  correctAnswer: null,
  selectedAnswer: null,
  remaining: null,
  hasPeeked: false,
};

function quiz(state = quizState, action) {
  switch (action.type) {
    case constants.UPDATE_QUESTION_TIMER:
      return { ...state, remaining: action.payload };

    case constants.RECEIVE_QUESTION:
      return {
        ...action.payload,
        selectedAnswer: null,
        hasPeeked: false
      };

    case constants.SELECT_ANSWER:
      return { ...state, selectedAnswer: action.payload };

    case constants.TOGGLE_PEEK:
      return { ...state, hasPeeked: true };

    default:
      return state;
  }
}

export default combineReducers({ countdown, quiz });