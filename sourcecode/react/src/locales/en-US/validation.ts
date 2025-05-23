export default {
  default: 'Validation failed',
  required: "Can't be empty",
  enum: 'must one of [${enum}]',
  whitespace: "Can't be empty",
  date: {
    format: 'Not a valid date format',
    parse: 'Cannot be converted to date format',
    invalid: 'Invalid date format',
  },
  types: {
    string: 'Only string can be entered',
    method: 'Only "${type}" can be entered',
    array: 'Only "${type}" can be entered',
    object: 'Only "${type}" can be entered',
    number: 'You can only enter numbers',
    date: 'Only date can be entered',
    boolean: 'Only "${type}" can be entered',
    integer: 'Only integers can be entered',
    float: 'You can only enter numbers',
    regexp: 'The input is invalid',
    email: 'The email format is incorrect',
    url: 'The url format is incorrect',
    hex: 'Only "${type}" can be entered',
  },
  string: {
    len: 'Must be ${len} characters',
    min: 'The value cannot be less than ${min}',
    max: 'A maximum of ${max} characters',
    range: 'The number of characters is between ${min} and ${max}',
  },
  number: {
    len: 'The value can only be ${len}',
    min: 'Not less than ${min}',
    max: 'Cannot be greater than ${max}',
    range: 'Only ${min} - ${max} can be entered',
  },
  array: {
    len: 'The ${len} item must be selected',
    min: 'No less than ${min}',
    max: 'No more than ${Max}',
    range: 'You must choose between ${min} - ${max}',
  },
  pattern: {
    mismatch: 'The input content is invalid',
  },
  'validation.twoInputNoEqual': 'Two Input Not Equal.',
  'validation.valueFormatIncorrect': 'The format of the entered value is incorrect',
};
