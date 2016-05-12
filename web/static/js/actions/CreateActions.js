import * as constants from '../constants';
import { putResource, createResource, deleteResource } from './ApiActions';
import axios from 'axios';

const Actions = {
  changeQuestion: (questionId) => {
    return dispatch => {
      dispatch({
        questionId,
        type: constants.CHANGE_QUESTION
      });
    };
  },

  addQuestion: (question) => {
    return dispatch => {
      dispatch({
        question,
        type: constants.ADD_QUESTION
      });
    };
  },

  createQuestion: () => {
    return (dispatch, getState) => {
      dispatch(createResource('questions', {
        question: {
          body: `Question ${getState().quiz.questions.length + 1}`,
          quizId: getState().quiz.id
        }
      }, r => {
        const question = r.data.question;
        dispatch(Actions.addQuestion(question));
        dispatch(Actions.changeQuestion(question.id));
      }));
    };
  },

  deleteQuestion: (questionId) => {
    return (dispatch, getState) => {
      const questions = getState().quiz.questions;
      const questionIdIndex = questions.findIndex(q => q.id === questionId);
      const previousQuestion = questions[questionIdIndex - 1].id;

      dispatch(deleteResource('questions', questionId, () => {
        dispatch({ type: constants.DELETE_QUESTION, questionId });
        dispatch(Actions.changeQuestion(previousQuestion));
      }));
    };
  },

  editQuestion: (body, questionId) => {
    return dispatch => {
      dispatch(putResource('questions', {
        id: questionId,
        question: { body }
      }));
      dispatch({
        body,
        questionId,
        type: constants.EDIT_QUESTION
      });
    };
  },

  editAnswer: (body, answerId) => {
    return dispatch => {
      dispatch(putResource('answers', {
        id: answerId,
        answer: { body }
      }));
      dispatch({
        body,
        answerId,
        type: constants.EDIT_ANSWER
      });
    };
  },

  markAnswerAsCorrect: (answerId, questionId) => {
    return dispatch => {
      dispatch(putResource('answers', {
        id: answerId,
        answer: { correct: true }
      }));
      dispatch({
        answerId,
        questionId,
        type: constants.MARK_ANSWER_AS_CORRECT,
      });
    };
  },

  openSettings: () => {
    return dispatch => {
      dispatch({
        type: constants.OPEN_SETTINGS_DIALOG
      });
    };
  },

  closeSettings: () => {
    return dispatch => {
      dispatch({
        type: constants.CLOSE_SETTINGS_DIALOG
      });
    };
  },

  openScheduleQuiz: () => {
    return dispatch => {
      dispatch({
        type: constants.OPEN_SCHEDULE_QUIZ_DIALOG
      });
    };
  },

  closeScheduleQuiz: () => {
    return dispatch => {
      dispatch({
        type: constants.CLOSE_SCHEDULE_QUIZ_DIALOG
      });
    };
  },

  updateSettings: (settings) => {
    return (dispatch, getState) => {
      dispatch(putResource('quizzes', {
        id: getState().quiz.id,
        quiz: { ...settings, specialEvents: true }
      }));
      dispatch({
        settings,
        type: constants.UPDATE_SETTINGS
      });
    };
  },

  updateSchedule: (startDate, isScheduled) => {
    return (dispatch, getState) => {
      const schedule = { startDate, isScheduled };
      dispatch(putResource('quizzes', {
        id: getState().quiz.id,
        schedule
      }));
      dispatch({
        schedule,
        type: constants.UPDATE_SCHEDULE
      });
    };
  }
};

export default Actions;
