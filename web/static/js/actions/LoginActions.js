import * as constants from '../constants';
import { apiCall, saveInProgress, saveSucceeded, saveFailed } from './ApiActions';
import { browserHistory } from 'react-router';
import normaliseQuiz from 'utils/normaliseQuiz';
import axios from 'axios';

const Actions = {
  changeHouse: (house) => {
    return dispatch => {
      dispatch({
        house,
        type: constants.CHANGE_HOUSE
      });
    };
  },

  changeYear: (year) => {
    return dispatch => {
      dispatch({
        year,
        type: constants.CHANGE_YEAR
      });
    };
  },

  openLoadQuizDialog: () => {
    return dispatch => {
      dispatch(Actions.fetchAllQuizzes());
      dispatch({
        type: constants.OPEN_LOAD_QUIZ_DIALOG
      });
    };
  },

  closeLoadQuizDialog: () => {
    return dispatch => {
      dispatch({
        type: constants.CLOSE_LOAD_QUIZ_DIALOG
      });
    };
  },

  fetchAllQuizzes: () => {
    return dispatch => {
      dispatch(saveInProgress());
      axios.get('/api/quizzes?basic=true')
        .then(r => {
          dispatch(saveSucceeded());
          dispatch({
            type: constants.RECEIVE_QUIZZES,
            quizzes: r.data.quizzes
          });
        })
        .catch(() => dispatch(saveFailed()));
    };
  },

  fetchQuiz: (quizId) => {
    return dispatch => {
      axios.get(`/api/quizzes/${quizId}`)
        .then(r => {
          dispatch(Actions.loadQuiz(r.data.quiz));
          browserHistory.push('/create');
        });
    };
  },

  loadQuiz: (quiz) => {
    return dispatch => {
      dispatch({
        quiz: normaliseQuiz(quiz),
        type: constants.LOAD_QUIZ
      });
    };
  },

  createQuiz: () => {
    return dispatch => {
      axios.post('/api/quizzes')
        .then(r => dispatch(Actions.fetchQuiz(r.data.id)))
        .catch(e => console.log(e));
    };
  },

  deleteQuiz: (quizId) => {
    return dispatch => {
      axios.delete(`/api/quizzes/${quizId}`)
        .then(() => dispatch(Actions.fetchAllQuizzes()));
      };
  }
};

export default Actions;
