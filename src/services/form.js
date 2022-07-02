export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z ]+$/.test(input.name)) {
    errors.name = "Name is invalid, only letters are allowed";
  } else if (!input.min_height) {
    errors.min_height = "Minimum height is required";
  } else if (/\D/.test(input.min_height)) {
    errors.min_height =
      "Minimum height is invalid, only positive numbers are allowed";
  } else if (!input.max_height) {
    errors.max_height = "Maximum height is required";
  } else if (/\D/.test(input.max_height)) {
    errors.max_height =
      "Maximum height is invalid, only positive numbers are allowed";
  } else if (parseInt(input.min_height) > parseInt(input.max_height)) {
    errors.max_height =
      "Maximum height has to be greater than or equal to the minimum height";
  } else if (!input.min_weight) {
    errors.min_weight = "Minimum weight is required";
  } else if (/\D/.test(input.min_weight)) {
    errors.win_height =
      "Minimum weight is invalid, only positive numbers are allowed";
  } else if (!input.max_weight) {
    errors.max_weight = "Maximum weight is required";
  } else if (/\D/.test(input.max_weight)) {
    errors.max_weight =
      "Maximum weight is invalid, only positive numbers are allowed";
  } else if (parseInt(input.min_weight) > parseInt(input.max_weight)) {
    errors.max_weight =
      "Maximum weight has to be greater than or equal to the minimum weight";
  } else if (input.life_span && /\D/.test(input.life_span)) {
    errors.life_span = "Lifespan is invalid, only positive numbers are allowed";
  } else if (
    input.image &&
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      input.image
    )
  ) {
    errors.image = "Image url is invalid";
  }
  return errors;
}

export function completedForm(name, minH, maxH, minW, maxW, e) {
  return !(name && minH && maxH && minW && maxW && !Object.keys(e).length);
}

export function getIdArray(objectArray) {
  let idArray = [];
  for (let i = 0; i < objectArray.length; i++) {
    idArray.push(parseInt(objectArray[i].id));
  }
  return idArray;
}
