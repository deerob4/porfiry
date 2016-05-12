import React, { PropTypes } from 'react';

const Icon = props => (
  <i onClick={props.onClick}
     className={`fa fa-${props.icon} ${props.className ? props.className : ''}`}></i>
);

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Icon;
