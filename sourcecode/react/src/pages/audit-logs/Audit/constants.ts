/**
 * http 状态码 颜色对象
 */
export const HTTP_STATUS_CODE_COLOR_MAP = {
  200: 'success',
  204: 'success',
  400: 'error',
  401: 'warning',
  403: 'error',
  500: 'error',
  501: 'error',
  502: 'error',
  503: 'error',
  504: 'error',
  505: 'error',
  506: 'error',
  507: 'error',
  508: 'error',
  509: 'error',
  510: 'error',
  511: 'error',
};

/**
 * http 请求方式颜色对象
 */
export const HTTP_METHOD_COLOR_MAP = {
  GET: 'processing',
  POST: 'success',
  DELETE: 'error',
  PUT: 'warning',
  HEAD: 'default',
  CONNECT: 'default',
  OPTIONS: 'default',
  TRACE: 'default',
};

/**
 * http状态码 字典
 */
export const HTTP_STATUS_CODE_DICT = [
  { value: 100, label: '100 - Continue' },
  { value: 101, label: '101 - Switching Protocols' },
  { value: 102, label: '102 - Processing' },
  { value: 103, label: '103 - Early Hints' },
  { value: 200, label: '200 - OK' },
  { value: 201, label: '201 - Created' },
  { value: 202, label: '202 - Accepted' },
  { value: 203, label: '203 - Non-authoritative Information' },
  { value: 204, label: '204 - No Content' },
  { value: 205, label: '205 - Reset Content' },
  { value: 206, label: '206 - Partial Content' },
  { value: 207, label: '207 - Multi-Status' },
  { value: 208, label: '208 - Already Registered' },
  { value: 226, label: '226 - IM Used' },
  { value: 300, label: '300 - Multiple Choices' },
  { value: 301, label: '301 - Moved Permanently' },
  { value: 302, label: '302 - Found' },
  { value: 303, label: '303 - See Other' },
  { value: 304, label: '304 - Not Modified' },
  { value: 305, label: '305 - Use Proxy' },
  { value: 306, label: '306 - Switch Proxy' },
  { value: 307, label: '307 - Temporary Redirect' },
  { value: 308, label: '308 - Permanent Redirect' },
  { value: 400, label: '400 - Bad Request' },
  { value: 401, label: '401 - Unauthorized' },
  { value: 402, label: '402 - Payment Required' },
  { value: 403, label: '403 - Forbidden' },
  { value: 404, label: '404 - Not Found' },
  { value: 405, label: '405 - Method Not Allowed' },
  { value: 406, label: '406 - Not Acceptable' },
  { value: 407, label: '407 - Proxy Authentication Required' },
  { value: 408, label: '408 - Request Timeout' },
  { value: 409, label: '409 - Conflict' },
  { value: 410, label: '410 - Gone' },
  { value: 411, label: '411 - Length Required' },
  { value: 412, label: '412 - Precondition Failed' },
  { value: 413, label: '413 - Payload Too Large' },
  { value: 414, label: '414 - Request-URI Too Long' },
  { value: 415, label: '415 - Unsupported Media Type' },
  { value: 416, label: '416 - Requested Range Not Satisfiable' },
  { value: 417, label: '417 - Expectation Failed' },
  { value: 421, label: '421 - Misdirected Request' },
  { value: 423, label: '423 - Locked' },
  { value: 424, label: '424 - Failed Dependency' },
  { value: 426, label: '426 - Upgrade Required' },
  { value: 428, label: '428 - Precondition Required' },
  { value: 429, label: '429 - Too Many Requests' },
  { value: 431, label: '431 - Request Header Fields Too Large' },
  { value: 451, label: '451 - Unavailable For Legal Reasons' },
  { value: 500, label: '500 - Internal Server Error' },
  { value: 501, label: '501 - Not Implemented' },
  { value: 502, label: '502 - Bad Gateway' },
  { value: 503, label: '503 - Service Unavailable' },
  { value: 504, label: '504 - Gateway Timeout' },
  { value: 505, label: '505 - HTTP Version Not Supported' },
  { value: 506, label: '506 - Variant Also Negotiates' },
  { value: 507, label: '507 - Insufficient Storage' },
  { value: 508, label: '508 - Loop Detected' },
  { value: 510, label: '510 - Not Extended' },
  { value: 511, label: '511 - Network Authentication Required' },
].map((item) => {
  return {
    ...item,
    label: item.value,
  };
});

/**
 * http method 字典
 */
export const HTTP_METHOD_DICT = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PUT', label: 'PUT' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'CONNECT', label: 'CONNECT' },
  { value: 'OPTIONS', label: 'OPTIONS' },
  { value: 'TRACE', label: 'TRACE' },
];
