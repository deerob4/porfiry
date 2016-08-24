import React, { Component, PropTypes } from 'react';
import { Line } from 'react-progressbar.js';

class QuestionTimer extends Component {
  render() {
    const containerStyle = {
      width: '100%',
      height: '200px'
    };

    const options = {
      // strokeWidth: 2
      rx: '4px',
      ry: '4px'
    };

    return (
      <Line
        progress={this.props.progress}
        options={options}
        containerStyle={containerStyle}
        text={this.props.progress} />
    );
  }
}

QuestionTimer.propTypes = {
  progress: PropTypes.number.isRequired
};
      // <div className="question-timer">
        // <div className="question-timer--inner"></div>
      // </div>

export default QuestionTimer;
