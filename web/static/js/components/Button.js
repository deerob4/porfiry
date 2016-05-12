import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Button = props => {
  const buttonClass = classnames({
    button: true,
    [props.className]: true,
    [`button--house-${[props.house]}`]: true,
    'button--size-small': props.size === 'small',
    'button--size-large': props.size === 'large'
  });

  return (
    <button className={buttonClass}
            onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  house: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large'])
};

Button.defaultProps = {
  size: 'large'
};

export default Button;
