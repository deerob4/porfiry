import * as constants from '../constants';
import normaliseQuiz from 'utils/normaliseQuiz';
import { browserHistory } from 'react-router';

const Actions = {
  connectToQuiz(socket, user, quizId) {
    return dispatch => {
      const channel = socket.channel(`quizzes:${quizId}`);

      channel.join().receive('ok', (quiz) => {
        dispatch({
          type: constants.CONNECT_TO_QUIZ,
          payload: {
            channel,
            quiz: normaliseQuiz(quiz)
          }
        });
      });

      channel.on('begin_quiz', () => {
        dispatch({
          type: constants.BEGIN_QUIZ
        });
      });

      channel.on('end_quiz', () => {
        dispatch({
          type: constants.END_QUIZ
        });

        browserHistory.push('/');
      });

      channel.on('update_countdown', (r) => {
        dispatch({
          type: constants.UPDATE_COUNTDOWN,
          payload: r.time_left
        });
      });

      channel.on('update_question_timer', (r) => {
        dispatch({
          type: constants.UPDATE_QUESTION_TIMER,
          payload: r.progress
        });
      });

      channel.on('receive_question', (r) => {
        dispatch({
          type: constants.RECEIVE_QUESTION,
          payload: {
            question: r.body,
            answers: r.answers,
            correctAnswer: r.correct_answer
          }
        });
      });
    };
  },

  leaveQuiz(channel) {
    return dispatch => {
      channel.leave();

      dispatch({
        type: constants.LEAVE_QUIZ
      });
    };
  },

  selectAnswer(channel, answerId) {
    return (dispatch, getState) => {
      const quiz = getState().player.quiz;

      let params = {
        id: answerId,
        peeked: quiz.hasPeeked,
        correct: answerId === quiz.correctAnswer,
      };

      channel.push('quiz:select_answer', params)
        .on('ok', () => {
          dispatch({
            type: constants.SELECT_ANSWER,
            payload: answerId
          });
        });
    };
  },

  togglePeek() {
    return dispatch => {
      dispatch({
        type: constants.TOGGLE_PEEK
      });
    };
  }
};

export default Actions;
