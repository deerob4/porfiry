import React, { PropTypes } from 'react';
import findIndex from 'lodash/findIndex';

const CurrentQuestion = props => {
  const { questions, currentQuestion } = props;
  const index = findIndex(questions, q => q.id === currentQuestion) + 1;

  return (
    <span>
      Question {index} out of {questions.length}
    </span>
  );
};

CurrentQuestion.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default CurrentQuestion;
