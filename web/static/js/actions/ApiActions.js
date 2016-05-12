import * as constants from '../constants';
import axios from 'axios';
import humps from 'humps';

export const saveInProgress = () => ({ type: constants.SAVING_IN_PROGRESS });
export const saveSucceeded = () => ({ type: constants.SAVING_SUCCEEDED });
export const saveFailed = () => ({ type: constants.SAVING_FAILED });

const apiCalls = {
  post: (resourceType, resourceBody) => (
    axios.post(`/api/${resourceType}`, (
      humps.decamelizeKeys(resourceBody)
    ))
  ),
  put: (resourceType, resourceBody) => (
    axios.put(`/api/${resourceType}/${resourceBody.id}`, (
      humps.decamelizeKeys(resourceBody)
    ))
  ),
  delete: (resourceType, resourceId) => (
    axios.delete(`/api/${resourceType}/${resourceId}`)
  )
};

function apiCall(method, resourceType, resource, callback = () => {}) {
  return dispatch => {
    dispatch(saveInProgress());
    apiCalls[method](resourceType, resource)
      .then(r => callback(r))
      .then(() => dispatch(saveSucceeded()))
      .catch(() => dispatch(saveFailed()));
  };
}

export function createResource(resourceType, resource, callback) {
  return dispatch => dispatch(apiCall('post', resourceType, resource, callback));
}

export function putResource(resourceType, resource) {
  return dispatch => dispatch(apiCall('put', resourceType, resource));
}

export function deleteResource(resourceType, resourceId, callback) {
  return dispatch => dispatch(apiCall('delete', resourceType, resourceId, callback));
}
