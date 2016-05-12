import React, { PropTypes } from 'react';
import Button from 'components/Button';
import moment from 'moment';

const formatDate = quizDate => moment(quizDate).format('Do MMMM, h:mm a');

const LoadQuizBlock = props => {
  const { quiz, house, loadQuiz, deleteQuiz } = props;
  return (
    <div>
      <h3>{quiz.title}</h3>

      {quiz.isScheduled
        ? <p>Scheduled for {formatDate(quiz.startDate)}</p>
        : <p>Quiz not yet scheduled</p>}

      <div className="button-container">
        <Button onClick={loadQuiz}
                size="small"
                house={house}>
          Load Quiz
        </Button>

        <Button onClick={deleteQuiz}
                size="small"
                house={house}>
          Delete Quiz
        </Button>
      </div>
    </div>
  );
};

LoadQuizBlock.propTypes = {
  deleteQuiz: PropTypes.func.isRequired,
  house: PropTypes.string.isRequired,
  loadQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.shape({
    title: PropTypes.string,
    isScheduled: PropTypes.bool,
    startDate: PropTypes.date
  }).isRequired,
};

export default LoadQuizBlock;
