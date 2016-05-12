import React, { PropTypes } from 'react';
import { HOUSES } from 'constants';
import Checkmark from 'components/Checkmark';
import EditableText from 'components/EditableText';

const Answer = props => (
  <div className={`answer answer--${props.house}`}>
    <span>{props.letter}.</span>

    <EditableText className={`input__Answer answer--${props.house}__Input`}
                  onBlur={props.editAnswer}
                  id={props.id}
                  body={props.body} />

    <Checkmark markAnswer={props.markAnswer}
               correct={props.correct}
               house={props.house} />
  </div>
);

Answer.propTypes = {
  body: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired,
  editAnswer: PropTypes.func.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  markAnswer: PropTypes.func.isRequired,
};

export default Answer;
