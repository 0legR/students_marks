import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
  console.log(data);
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'The email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.phones.match(/^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s[0-9]*$/)) {
    errors.phones = 'Phone Number is invalid';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'The username field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'The password field is required';
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'The password confirmation field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'The password must match';
  }

  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'The timezone field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
