import * as constants from '../constants';

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

export default quiz;
