import * as constants from '../constants';
import { browserHistory } from 'react-router';
import normaliseQuiz from 'utils/normaliseQuiz';
import axios from 'axios';

const Actions = {
  connectToLobby(socket) {
    return dispatch => {
      const channel = socket.channel('quizzes:lobby');

      channel.join().receive('ok', () => {
        channel.push('check_status');

        dispatch({
          type: constants.CONNECT_TO_LOBBY,
          payload: channel
        });
      });

      channel.on('begin_countdown', (r) => {
        dispatch({
          type: constants.BEGIN_COUNTDOWN,
          payload: {
            quizId: r.id,
            startDate: r.start_date
          }
        });
      });

      channel.on('end_quiz', () => {
        dispatch({
          type: constants.END_QUIZ
        });
      });
    };
  },

  leaveLobby(channel) {
    channel.leave();

    return {
      type: constants.LEAVE_LOBBY
    };
  },

  changeHouse(house) {
    return {
      type: constants.CHANGE_HOUSE,
      payload: house,
    };
  },

  changeYear(year) {
    return {
      type: constants.CHANGE_YEAR,
      payload: year
    };
  },

  openLoadQuizDialog() {
    return dispatch => {
      dispatch(Actions.fetchAllQuizzes());
      dispatch({
        type: constants.OPEN_LOAD_QUIZ_DIALOG
      });
    };
  },

  closeLoadQuizDialog() {
    return {
      type: constants.CLOSE_LOAD_QUIZ_DIALOG
    };
  },

  fetchAllQuizzes() {
    return dispatch => {
      axios.get('/api/quizzes?basic=true')
        .then(r => {
          dispatch({
            type: constants.RECEIVE_QUIZZES,
            payload: r.data.quizzes
          });
        });
    };
  },

  fetchQuiz(quizId) {
    return dispatch => {
      axios.get(`/api/quizzes/${quizId}`)
        .then(r => {
          dispatch(Actions.loadQuiz(r.data.quiz));
          browserHistory.push('/create');
        });
    };
  },

  joinQuiz() {
    browserHistory.push('/play');
  },

  loadQuiz(quiz) {
    return {
      type: constants.LOAD_QUIZ,
      payload: normaliseQuiz(quiz),
    };
  },

  createQuiz() {
    return dispatch => {
      axios.post('/api/quizzes')
        .then(r => dispatch(Actions.fetchQuiz(r.data.id)))
        .catch(e => console.log(e));
    };
  },

  deleteQuiz(quizId) {
    return dispatch => {
      axios.delete(`/api/quizzes/${quizId}`)
        .then(() => dispatch(Actions.fetchAllQuizzes()));
    };
  }
};

export default Actions;
