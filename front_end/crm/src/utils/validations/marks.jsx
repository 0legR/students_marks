import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(mark) {
  let errors = {};
  let alphaExp = /^[a-zA-Z ]+$/;
  let numberExp = /^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/;
  let symbolsExp = /^[!@#$%^&*()_+=<>|./?,-]/;
  console.log(mark);
  

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
