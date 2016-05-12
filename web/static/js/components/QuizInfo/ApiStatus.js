import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ApiStatus = props => {
  let status =
    props.isSaving
      ? { icon: 'circle-o-notch fa-spin', message: 'Saving' } :
    props.saveSucceeded
      ? { icon: 'check', message: 'All changes saved!' } :
    props.saveFailed
      ? { icon: 'exclamation-circle', message: 'Error saving' } : '';

  return (
    <span>
      {status.message}
      <Icon icon={status.icon} />
    </span>
  );
};

ApiStatus.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  saveFailed: PropTypes.bool.isRequired,
  saveSucceeded: PropTypes.bool.isRequired
};

export default ApiStatus;
