import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(mark) {
  let errors = {};
  let alphaExp = /^[a-zA-Z ]+$/;
  let numberExp = /^[0-5]$/;
  let symbolsExp = /^[!@#$%^&*()_+=<>|./?,-]/;
  mark.forEach(function(data) {
    let visually = String(data.visually);
    let code = String(data.code);
    let explanation = String(data.explanation);
    let stability = String(data.stability);
    let presentation = String(data.presentation);
    let questions = String(data.questions);
    let favorite_place = String(data.favorite_place);
    let favoritism = String(data.favoritism);
    let all_name = String(data.all_name);

    if (Validator.isEmpty(all_name)) {
    errors.all_name = 'The type`s name field is required';
    }
    if (!Validator.isLength(all_name, {min: 4, max: 60})) {
      errors.all_name = 'The All Name field must has length between 4-60 letters';
    }

    if (!all_name.match(alphaExp)) {
      errors.all_name = 'The All Name field should consist only english alphabet an space';
    }

    if (!Validator.isEmpty(visually) && visually !== "null" && !visually) {
      if (!visually.match(numberExp)) {
        errors.visually = 'The Visually field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(code) && code !== "null" && !code) {
      if (!code.match(numberExp)) {
        errors.code = 'The Code field is not Integer  or not between 0-5';
      }
    }

    if (!Validator.isEmpty(explanation) && explanation !== "null" && !explanation) {
      if (!explanation.match(numberExp)) {
        errors.explanation = 'The Explanation field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(stability) && stability !== "null" && !stability) {
      if (!stability.match(numberExp)) {
        errors.stability = 'The Stability field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(presentation) && presentation !== "null" && !presentation) {
      if (!presentation.match(numberExp)) {
        errors.presentation = 'The Presentation field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(questions) && questions !== "null" && !questions) {
      if (!questions.match(numberExp)) {
        errors.questions = 'The Questions field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(favorite_place) && favorite_place !== "null" && !favorite_place) {
      if (!favorite_place.match(numberExp)) {
        errors.favorite_place = 'The Favorite Place field is not Integer or not between 0-5';
      }
    }

    if (!Validator.isEmpty(favoritism) && favoritism !== "null" && !favoritism) {
      if (!favoritism.match(symbolsExp)) {
        errors.favoritism = 'The Favoritism field is not Symbol';
      }
    }
    // if (!Validator.isNumber(data.print_out, [{min: 1, max: 10}])) {
    //   errors.print_out = 'The Print Out field is not Integer or must be between 1-10';
    // }

    // if (!Validator.isNumber(data.english_pd, [{min: 1, max: 10}])) {
    //   errors.english_pd = 'The English PD field is not Integer or must be between 1-10';
    // }

    // if (!Validator.isNumber(data.git, [{min: 1, max: 10}])) {
    //   errors.git = 'The GIT field is not Integer or must be between 1-10';
    // }

    // if (!Validator.isLength(data.notes, {min: 4, max: 60})) {
    //   errors.notes = 'The Notes field must has length between 4-60 letters';
    // }  
  });
  

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
