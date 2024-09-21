import type { TablePaginationConfig } from 'antd';

// const isDev = process.env.NODE_ENV === 'development';

/**
 * 网络状态消息映射
 */
export const NETWORK_STATUS = {
  200: 'The server successfully returned the requested data.',
  201: 'Create or modify data successfully.',
  202: 'A request has entered the background queue (async task).',
  204: 'Delete data successfully.',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: "User doesn't have permission (token, username, wrong password).",
  403: 'User is authorized, but access is forbidden.',
  404: 'The request was made for a record that does not exist and the server did nothing. ',
  405: 'Request method not allowed. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource is permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred.',
  500: 'A server error occurred, please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

/**
 * 预定义日期时间格式
 */
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 预定义日期格式
 */
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

// /**
//  * 预定义表单验证消息
//  */
// export const VALIDATE_MESSAGES_ZH = {
//   default: '验证失败',
//   required: '不能为空',
//   enum: '必须是 [${enum}]中的一项',
//   whitespace: '不能为空',
//   date: {
//     format: '不是有效的日期格式',
//     parse: '不能转换成日期格式',
//     invalid: '无效的日期格式',
//   },
//   types: {
//     string: '只能输入字符串类型',
//     method: '只能输入"${type}"类型',
//     array: '只能输入"${type}"类型',
//     object: '只能输入"${type}"类型',
//     number: '只能输入数字',
//     date: '只能输入日期',
//     boolean: '只能输入"${type}"类型',
//     integer: '只能输入整数',
//     float: '只能输入数值',
//     regexp: '输入不符合要去',
//     email: 'email格式不正确',
//     url: 'url格式不正确',
//     hex: '只能输入"${type}"类型',
//   },
//   string: {
//     len: '必须为 ${len} 个字符',
//     min: '不能少于 ${min} 个字符',
//     max: '不能多于 ${max} 个字符',
//     range: '字符个数在 ${min} - ${max} 之间',
//   },
//   number: {
//     len: '值只能为 ${len}',
//     min: '不能小于 ${min}',
//     max: '不能大于 ${max}',
//     range: '只能在 ${min} - ${max}之间',
//   },
//   array: {
//     len: '必须选择 ${len} 项',
//     min: '不能少于 ${min} 项',
//     max: '不能多于 ${max} 项',
//     range: '必须选择在 ${min} - ${max} 项之间',
//   },
//   pattern: {
//     mismatch: '输入的内容不符合要求',
//   },
// };

// /**
//  * 预定义表单验证消息
//  */
// export const VALIDATE_MESSAGES = {
//   default: 'Validation failed',
//   required: 'Can\'t be empty',
//   enum: 'must one of [${enum}]',
//   whitespace: 'Can\'t be empty',
//   date: {
//     format: 'Not a valid date format',
//     parse: 'Cannot be converted to date format',
//     invalid: 'Invalid date format',
//   },
//   types: {
//     string: 'Only string can be entered',
//     method: 'Only "${type}" can be entered',
//     array: 'Only "${type}" can be entered',
//     object: 'Only "${type}" can be entered',
//     number: 'You can only enter numbers',
//     date: 'Only date can be entered',
//     boolean: 'Only "${type}" can be entered',
//     integer: 'Only integers can be entered',
//     float: 'You can only enter numbers',
//     regexp: 'The input is invalid',
//     email: 'The email format is incorrect',
//     url: 'The url format is incorrect',
//     hex: 'Only "${type}" can be entered',
//   },
//   string: {
//     len: 'Must be ${len} characters',
//     min: 'The value cannot be less than ${min}',
//     max: 'A maximum of ${max} characters',
//     range: 'The number of characters is between ${min} and ${max}',
//   },
//   number: {
//     len: 'The value can only be ${len}',
//     min: 'Not less than ${min}',
//     max: 'Cannot be greater than ${max}',
//     range: 'Only ${min} - ${max} can be entered',
//   },
//   array: {
//     len: 'The ${len} item must be selected',
//     min: 'No less than ${min}',
//     max: 'No more than ${Max}',
//     range: 'You must choose between ${min} - ${max}',
//   },
//   pattern: {
//     mismatch: 'The input content is invalid',
//   },
// };
