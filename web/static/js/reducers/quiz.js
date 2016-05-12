import * as constants from '../constants';
import { combineReducers } from 'redux';
import nextId from 'utils/nextId';

function id(state = null, action) {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.quiz.id;

    default:
      return state;
  }
}

function currentQuestion(state = 0, action) {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.quiz.questions[0].id;

    case constants.CHANGE_QUESTION:
      return action.questionId;

    default:
      return state;
  }
}

function settings(state = {}, action) {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.quiz.settings;

    case constants.UPDATE_SCHEDULE:
      return {
        ...state,
        startDate: action.schedule.startDate,
        isScheduled: action.schedule.isScheduled
      };

    case constants.UPDATE_SETTINGS:
      return action.settings;

    default:
      return state;
  }
}

function questions(state = [], action) {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.quiz.questions.sort(q => q.id);

    case constants.ADD_QUESTION:
      return [...state, {
        id: action.question.id,
        body: action.question.body
      }];

    case constants.EDIT_QUESTION:
      return state.map(question =>
        question.id === action.questionId ?
          { ...question, body: action.body } :
        question
      );

    case constants.DELETE_QUESTION:
      return state.filter(question => question.id !== action.questionId);

    default:
      return state;
  }
}

function answers(state = [], action) {
  switch (action.type) {
    case constants.LOAD_QUIZ:
      return action.quiz.answers.sort(a => a.id);

    case constants.ADD_QUESTION:
      return [...state, ...action.question.answers];

    case constants.EDIT_ANSWER:
      return state.map(answer =>
        answer.id === action.answerId ?
          { ...answer, body: action.body } :
        answer
      );

    case constants.MARK_ANSWER_AS_CORRECT:
      return state.map(answer =>
        // Mark currently correct answer as incorrect.
        answer.questionId === action.questionId && answer.correct ?
          { ...answer, correct: false } :
        // Mark selected answer as correct.
        answer.id === action.answerId ?
          { ...answer, correct: true } :
        answer
      );

    case constants.DELETE_QUESTION:
      return state.filter(answer => answer.questionId !== action.questionId);

    default:
      return state;
  }
}

export default combineReducers({
  id,
  answers,
  settings,
  questions,
  currentQuestion,
});
