import React, { PropTypes } from 'react';
import EditableText from 'components/EditableText';
import { HOUSES } from 'constants';

const QuestionHeadings = props => {
  const { currentQuestion, editQuestion, house, questions } = props;

  return (
    <div>
      {questions.map((question, i) => {
        if (question.id === currentQuestion) {
          return (
            <EditableText key={i}
                          id={currentQuestion}
                          className={`heading__h1 heading--primary--${house} input__Question`}
                          onBlur={editQuestion}
                          body={questions.find(question => question.id === currentQuestion).body} />
          );
        }
      })}
    </div>
  );
};

QuestionHeadings.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  editQuestion: PropTypes.func.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  questions: PropTypes.array.isRequired
};

export default QuestionHeadings;
