import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ApiStatus = props => {
  let status =
    props.isSaving
      ? { icon: 'circle-o-notch fa-spin', message: 'Saving' } :
    props.saveSucceeded
      ? { icon: 'check', message: 'All changes saved!' } :
    props.saveFailed
      ? { icon: 'exclamation-circle', message: props.error } : '';

  return (
    <span>
      {status.message}
      <Icon icon={status.icon} />
    </span>
  );
};

ApiStatus.propTypes = {
  error: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveFailed: PropTypes.bool.isRequired,
  saveSucceeded: PropTypes.bool.isRequired
};

export default ApiStatus;
