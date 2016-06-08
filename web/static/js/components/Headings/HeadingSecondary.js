import React, { PropTypes } from 'react';
import classnames from 'classnames';

const HeadingSecondary = props => {
  let headingClass = classnames(
    `heading--secondary--${props.house}`,
    { [`heading--secondary-${props.type}`]: props.type }
  );

  return (
    <h2 className={headingClass}>
      {props.children}
    </h2>
  );
};

HeadingSecondary.propTypes = {
  house: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default HeadingSecondary;
