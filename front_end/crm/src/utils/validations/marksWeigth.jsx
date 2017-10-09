import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
  let errors = {};
  let numberExp = /^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/;


  if (Validator.isEmpty(data.weigth)) {
    errors.weigth = 'The type field is required';
  } else {
    if (!data.weigth.match(numberExp)) {
        errors.weigth = 'The Weigth field is not Float or not between 0-5';
     }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
