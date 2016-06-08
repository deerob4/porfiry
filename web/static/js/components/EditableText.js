import React, { Component } from 'react';
import trim from 'lodash/trim';

const EditableText = props => (
  <input className={props.className}
         placeholder={props.body}
         defaultValue={props.body}
         onBlur={e => {
           const newBody = trim(e.target.value);
           if (newBody.length && newBody !== props.body) {
             props.onBlur(newBody, props.id);
           }
           // Remove any whitespace from input.
           if (e.target.value !== newBody) {
             e.target.value = newBody;
           }
         }} />
);

export default EditableText;
