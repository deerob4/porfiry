import * as constants from '../constants';

const questionState = {
  body: 'Who is the current Queen of England?',
  answers: [{body: 'hey'}, {body: 'you'}, {body: 'pikachu'}],
  correctAnswer: null,
  selectedAnswer: null,
  progress: 1,
  hasPeeked: false,
};

function question(state = questionState, action) {
  switch (action.type) {
    case constants.UPDATE_QUESTION_TIMER:
      return { ...state, progress: action.payload };

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

export default question;
