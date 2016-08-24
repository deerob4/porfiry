import React, { PropTypes } from 'react';
import { HOUSES } from 'constants';
import CurrentQuestion from './CurrentQuestion';
import QuizLength from './QuizLength';
import ApiStatus from './ApiStatus';
import ScheduleStatus from './ScheduleStatus';

const EditorInfo = props => {
  const { api, currentQuestion, house, questionLength, questions, isScheduled } = props;
  return (
    <p className={`heading--secondary--${house}`}>
      <CurrentQuestion currentQuestion={currentQuestion} questions={questions} /> &nbsp; • &nbsp;
      <QuizLength questions={questions} questionLength={questionLength} /> &nbsp; • &nbsp;
      <ApiStatus {...api} /> &nbsp; • &nbsp;
      <ScheduleStatus isScheduled={isScheduled} />
    </p>
  );
};

EditorInfo.propTypes = {
  api: PropTypes.object.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  isScheduled: PropTypes.bool.isRequired,
  questionLength: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default EditorInfo;
