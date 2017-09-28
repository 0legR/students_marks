import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.typename)) {
    errors.typename = 'The type`s name field is required';
  }
  if (!Validator.isLength(data.typename, {min: 4, max: 20})) {
    errors.typename = 'The type`s name field must has length between 4-20 letters';
  }

  if (Validator.isEmpty(data.typeId)) {
    errors.typeId = 'The type`s identifier field is required';
  }

  if (!Validator.isInt(data.typeId, [{min: 1, max: 10}])) {
    errors.typeId = 'The type`s identifier field is not Integer or must be between 1-10';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
