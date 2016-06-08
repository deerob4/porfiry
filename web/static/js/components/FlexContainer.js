import React from 'react';
import classnames from 'classnames';

const FlexContainer = (props) => {
  let flexClass = classnames({
    'flexbox-container': true,
    [props.className]: true
  });

  return (
    <div className={flexClass}>
      <div className="inner">
        {props.children}
      </div>
    </div>
  );
};

export default FlexContainer;
