import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = 'The name field is required';
  } else {
    if (!Validator.isLength(data.name, {min: 2, max: 20})) {
      errors.name = 'The name field must has length between 4-20 letters';
    }  
  }
  
  if (Validator.isEmpty(data.type)) {
    errors.type = 'The type field is required';
  } else {

    if (!Validator.isLength(data.type, {min: 5, max: 7})) {
      errors.type = 'The type field must has length between 5-8 letters';
    } else {
      if (data.type !== "string" && data.type !== "boolean" && data.type !== "float") {
        errors.type = 'The type field must has name only "string" or "boolean" , "float"';
      }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}