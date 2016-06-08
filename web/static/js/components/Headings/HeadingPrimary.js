import React, { PropTypes } from 'react';
import classnames from 'classnames';

const HeadingPrimary = props => {
  let headingClass = classnames(
    `heading--primary--${props.house}`,
    { [`heading--primary-${props.type}`]: props.type }
  );

  return (
    <h1 className={headingClass}>
      {props.children}
    </h1>
  );
};

HeadingPrimary.propTypes = {
  house: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default HeadingPrimary;
