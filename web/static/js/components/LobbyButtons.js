import React, { PropTypes } from 'react';
import Button from 'components/Button';

const LobbyButtons = props => {
  const { quizStatus, house, loadQuiz, createQuiz, joinQuiz } = props;

  if (!quizStatus) {
    return (
      <div className="button-container button-container--login">
        <Button className="button__Login"
                house={house}
                onClick={createQuiz}>
          Create a new quiz
        </Button>
        <Button className="button__Login"
                house={house}
                onClick={loadQuiz}>
          Load a quiz
        </Button>
      </div>
    );
  } else {
    return (
      <div className="animated bounceInUp button-container button-container--login">
        <Button className="button__Login button__Login-join"
                house={house}
                onClick={joinQuiz}>
          Join the quiz
        </Button>
      </div>
    );
  }
};

LobbyButtons.propTypes = {
  createQuiz: PropTypes.func.isRequired,
  house: PropTypes.string.isRequired,
  joinQuiz: PropTypes.func.isRequired,
  loadQuiz: PropTypes.func.isRequired,
  quizStatus: PropTypes.oneOf([false, 'countingDown', 'inProgress']).isRequired,
};

export default LobbyButtons;
