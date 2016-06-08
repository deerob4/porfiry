import React, { PropTypes } from 'react';

const QuizLength = props => (
  <span>Quiz will take {props.questions.length * props.questionLength} seconds</span>
);

QuizLength.propTypes = {
  questionLength: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default QuizLength;
