import React, { Component } from 'react';
import FlexContainer from 'components/FlexContainer';

function formatTimeLeft(timeLeft) {
  const { minutes, seconds } = timeLeft;

  let message =
    minutes > 0
      ? `${minutes} minutes and ${seconds} seconds` :
    seconds > 0
      ? `${seconds} seconds` :
    minutes === 0 && seconds === 0
      ? '0 seconds' : '';

  return message;
}

const Countdown = (props) => {
  const { house, timeLeft } = props;

  return (
    <FlexContainer className="countdown animated bounceInDown">
      <h1 className={`heading--primary--${house}`}>
        You're a bit early!
      </h1>
      <h2 className={`heading--secondary--${house}`}>
        The quiz will begin in
      </h2>
      <h2 className={`heading--secondary--${house}`}>
        {formatTimeLeft(timeLeft)}
      </h2>
    </FlexContainer>
  );
};

export default Countdown;
