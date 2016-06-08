import * as constants from '../constants';

function quizStatus(state = false, action) {
  switch (action.type) {
    case constants.BEGIN_COUNTDOWN:
      return 'countingDown';

    case constants.BEGIN_QUIZ:
      return 'inProgress';

    case constants.END_QUIZ:
      return false;

    default:
      return state;
  }
}

export default quizStatus;
