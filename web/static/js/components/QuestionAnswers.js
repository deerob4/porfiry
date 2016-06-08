import React, { PropTypes } from 'react';
import Answer from 'components/Answer';
import { HOUSES } from 'constants';
import findLetterTerm from 'utils/findLetterTerm';

const QuestionAnswers = props => {
  const { answers, currentQuestion, correctAnswer, editAnswer, house, markAnswer } = props;

  return (
    <div>
      {answers.map((answer, i) => {
        if (answer.questionId === currentQuestion) {
          return (
            <Answer key={i}
                    id={answer.id}
                    body={answer.body}
                    correct={answer.id === correctAnswer}
                    editAnswer={editAnswer}
                    house={house}
                    letter={findLetterTerm(i)}
                    markAnswer={() => markAnswer(answer.id)} />
          );
        }
      })}
    </div>
  );
};

export default QuestionAnswers;

