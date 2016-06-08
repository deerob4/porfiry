import * as constants from '../constants';
import previousFromIndex from 'utils/previousFromIndex';
import axios from 'axios';

const Actions = {
  connectToEditor(socket, quizId) {
    return dispatch => {
      const channel = socket.channel(`editors:${quizId}`);

      channel.join().receive('ok', () => {
        dispatch({
          payload: channel,
          type: constants.CONNECT_TO_EDITOR
        });
      });
    };
  },

  leaveEditor(channel) {
    return dispatch => {
      channel.leave();
      dispatch({
        type: constants.LEAVE_EDITOR
      });
    };
  },

  leaveEditor(channel) {
    channel.leave();
    return {
      type: constants.LEAVE_EDITOR
    };
  },

  savingFailed(error) {
    return {
      error: error.message,
      type: constants.SAVING_FAILED
    };
  },

  changeQuestion(questionId) {
    return {
      type: constants.CHANGE_QUESTION,
      payload: questionId
    };
  },

  createQuestion(channel) {
    return (dispatch, getState) => {
      const { questions } = getState().editor;

      let params = {
        question: {
          body: `Question ${questions.length + 1}`
        }
      };

      channel.push('questions:create', params)
        .receive('ok', (r) => {
          dispatch({
            type: constants.ADD_QUESTION,
            payload: r.question,
          });

          dispatch(Actions.changeQuestion(r.question.id));
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  editQuestion(channel, questionId, body) {
    return dispatch => {
      let params = {
        id: questionId,
        question: { body }
      };

      channel.push('questions:edit', params)
        .receive('ok', () => {
          dispatch({
            type: constants.EDIT_QUESTION,
            payload: { body, questionId }
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  deleteQuestion(channel, questionId) {
    return (dispatch, getState) => {
      channel.push('questions:delete', { id: questionId })
        .receive('ok', (question) => {
          const questions = getState().editor.questions;
          const changeTo = previousFromIndex(questions, questionId);

          dispatch(Actions.changeQuestion(changeTo));

          dispatch({
            type: constants.DELETE_QUESTION,
            payload: questionId
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  editAnswer(channel, answerId, body) {
    return dispatch => {
      let params = {
        id: answerId,
        answer: { body }
      };

      channel.push('answers:edit', params)
        .receive('ok', (answer) => {
          dispatch({
            type: constants.EDIT_ANSWER,
            payload: { body, answerId }
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  markAnswerAsCorrect(channel, questionId, correctAnswer) {
    return dispatch => {
      let params = {
        id: questionId,
        question: { correct_answer: correctAnswer }
      };

      channel.push('questions:edit', params)
        .receive('ok', (question) => {
          dispatch({
            type: constants.MARK_ANSWER_AS_CORRECT,
            payload: { questionId, correctAnswer }
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  updateSchedule(channel, startDate, isScheduled) {
    return (dispatch, getState) => {
      let params = {
        id: getState().editor.id,
        quiz: {
          start_date: startDate,
          is_scheduled: isScheduled
        }
      };

      channel.push('quizzes:schedule', params)
        .receive('ok', () => {
          dispatch({
            type: constants.UPDATE_SCHEDULE,
            payload: { startDate, isScheduled }
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  updateSettings(channel, settings) {
    return (dispatch, getState) => {
      let params = {
        id: getState().editor.id,
        quiz: { ...settings }
      };

      channel.push('quizzes:edit', params)
        .receive('ok', () => {
          dispatch({
            type: constants.UPDATE_SETTINGS,
            payload: settings
          });
        })
        .receive('error', (err) => {
          dispatch(Actions.savingFailed(err));
        });
    };
  },

  openSettings() {
    return {
      type: constants.OPEN_SETTINGS_DIALOG
    };
  },

  closeSettings() {
    return {
      type: constants.CLOSE_SETTINGS_DIALOG
    };
  },

  openScheduleQuiz() {
    return {
      type: constants.OPEN_SCHEDULE_QUIZ_DIALOG
    };
  },

  closeScheduleQuiz() {
    return {
      type: constants.CLOSE_SCHEDULE_QUIZ_DIALOG
    };
  }
};

export default Actions;
