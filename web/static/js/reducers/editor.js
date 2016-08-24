import * as constants from '../constants';
import { combineReducers } from 'redux';
import nextId from 'utils/nextId';

const id = (state = null, action) => {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.payload.id;

    default:
      return state;
  }
};

const currentQuestion = (state = 0, action) => {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.payload.questions[0].id;

    case constants.CHANGE_QUESTION:
      return action.payload;

    default:
      return state;
  }
};

const settings = (state = {}, action) => {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.payload.settings;

    case constants.UPDATE_SCHEDULE:
      return {
        ...state,
        startDate: action.payload.startDate,
        isScheduled: action.payload.isScheduled
      };

    case constants.UPDATE_SETTINGS:
      return action.payload;

    default:
      return state;
  }
};

const questions = (state = [], action) => {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.payload.questions.sort(q => q.id);

    case constants.ADD_QUESTION:
      return [...state, {
        id: action.payload.id,
        body: action.payload.body,
        correctAnswer: action.payload.correctAnswer
      }];

    case constants.EDIT_QUESTION:
      return state.map(question =>
        question.id === action.payload.questionId
          ? { ...question, body: action.payload.body }
          :  question
      );

    case constants.MARK_ANSWER_AS_CORRECT:
      return state.map(question =>
        question.id === action.payload.questionId
          ? { ...question, correctAnswer: action.payload.correctAnswer }
          : question
      );

    case constants.DELETE_QUESTION:
      return state.filter(question => question.id !== action.payload);

    default:
      return state;
  }
};

const answers = (state = [], action) => {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.payload.answers.sort(a => a.id);

    case constants.ADD_QUESTION:
      return [...state, ...action.payload.answers];

    case constants.EDIT_ANSWER:
      return state.map(answer =>
        answer.id === action.answerId
          ? { ...answer, body: action.payload.body }
          :  answer
      );

    case constants.DELETE_QUESTION:
      return state.filter(answer => answer.questionId !== action.payload);

    default:
      return state;
  }
};

export default combineReducers({
  id,
  answers,
  settings,
  questions,
  currentQuestion,
});
