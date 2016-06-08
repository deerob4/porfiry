import * as constants from 'constants';

let defaultState = {
  isSaving: false,
  saveSucceeded: true,
  saveFailed: false,
  error: ''
};

function api(state = defaultState, action) {
  switch (action.type) {
    case constants.SAVING_IN_PROGRESS:
      return {
        ...state,
        isSaving: true,
        saveSucceeded: false
      };

    case constants.SAVING_SUCCEEDED:
      return {
        isSaving: false,
        saveSucceeded: true,
        saveFailed: false,
        error: ''
      };

    case constants.SAVING_FAILED:
      return {
        isSaving: false,
        saveFailed: true,
        saveSucceeded:false,
        error: action.error
      };

    default:
      return state;
  }
}

export default api;
