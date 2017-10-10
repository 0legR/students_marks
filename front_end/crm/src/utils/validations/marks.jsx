import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(mark, COLUMN_TYPE) {
  let errors = {};
  let alphaExp = /^[a-zA-Z ]+$/;
  let numberExp = /^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/;
  let symbolsExp = /^[!@#$%^&*()_+=<>|./?,-]$/;

  mark.forEach(function(data) {
    Object.keys(data).map((columnName, k) => {
      if (COLUMN_TYPE[columnName] === 'float' && columnName !== 'current_rating') {
        if (!Validator.isEmpty(String(data[columnName])) && String(data[columnName]) !== "null") {
          if (!String(data[columnName]).match(numberExp)) {
            errors[columnName] = `The ${columnName} field is not Float or not between 0-5`;
          }
        }
      }
      if (columnName === 'all_name') {
        if (Validator.isEmpty(String(data[columnName]))) {
          errors[columnName] = `The ${columnName} field is required`;
        } else {
          if (!Validator.isLength(String(data[columnName]), {min: 4, max: 60})) {
            errors[columnName] = `The ${columnName} field must has length between 4-60 letters`;
          }

          if (!String(data[columnName]).match(alphaExp)) {
            errors[columnName] = `The ${columnName} field should consist only english alphabet an space`;
          }
        }
      }
      if (COLUMN_TYPE[columnName] === 'string' && columnName !== 'all_name') {
        if (!Validator.isEmpty(String(data[columnName])) && String(data[columnName]) !== "null") {
          if (!data[columnName].match(alphaExp)) {
            errors[columnName] = `The ${columnName} field should consist only english alphabet an space`;
          }
        }
      }
      if (COLUMN_TYPE[columnName] === 'text') {
        if (!Validator.isEmpty(String(data[columnName])) && String(data[columnName]) !== "null") {
          if (!data[columnName].match(symbolsExp)) {
            errors[columnName] = `The ${columnName} field should consist only symbols (!@#$%^&*()_+=<>|./?,-)`;
          }
        }
      }
      if (COLUMN_TYPE[columnName] === 'boolean') {
        if (!Validator.isBoolean(String(data[columnName])) && String(data[columnName]) !== "null") {
            errors[columnName] = `The ${columnName} field is not Boolean`;
        }
      }
    })
  });
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
