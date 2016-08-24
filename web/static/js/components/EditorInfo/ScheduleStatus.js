import React, { PropTypes } from 'react';

const ScheduleStatus = isScheduled => {
  let status =
    isScheduled
      ? 'Scheduled'
      : 'Not Scheduled';

  return (
    <span>
      {status}
    </span>
  );
};

export default ScheduleStatus;
