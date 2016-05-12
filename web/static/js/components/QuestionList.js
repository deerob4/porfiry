import React, { PropTypes } from 'react';
import { HOUSES } from 'constants';

const QuestionList = props => (
  <select className={`select--${props.house}`}
          value={props.currentQuestion}
          onChange={props.changeQuestion}>

    {props.questions.map((question, i) =>
      <option key={i} value={question.id}>
        {`${i + 1}. ${question.body}`}
      </option>
    )}
  </select>
);

QuestionList.propTypes = {
  changeQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  questions: PropTypes.array.isRequired
};

export default QuestionList;
