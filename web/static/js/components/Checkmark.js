import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import { HOUSES } from 'constants';

const Checkmark = props => (
  <Icon onClick={props.markAnswer}
        icon="check-circle"
        className={`${props.correct ? 'check__Correct--' + props.house : ''}`} />
);

Checkmark.propTypes = {
  correct: PropTypes.bool.isRequired,
  house: PropTypes.oneOf(HOUSES).isRequired,
  markAnswer: PropTypes.func.isRequired,
};

export default Checkmark;
