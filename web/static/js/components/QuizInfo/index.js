import React, { PropTypes } from 'react';
import { HOUSES } from 'constants';
import CurrentQuestion from './CurrentQuestion';
import QuizLength from './QuizLength';
import ApiStatus from './ApiStatus';

const QuizInfo = props => {
  const { api, currentQuestion, house, questionLength, questions,  } = props;
  return (
    <p className={`heading--secondary--${house}`}>
      <CurrentQuestion currentQuestion={currentQuestion} questions={questions} /> &nbsp; • &nbsp;
      <QuizLength questions={questions} questionLength={questionLength} /> &nbsp; • &nbsp;
      <ApiStatus {...api} />
    </p>
  );
};

QuizInfo.propTypes = {
  api: PropTypes.object.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  questionLength: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default QuizInfo;
