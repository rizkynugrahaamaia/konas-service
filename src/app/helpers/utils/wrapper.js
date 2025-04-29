
const { NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError, UnprocessableEntityError } = require('../error');
const { ERROR:httpError } = require('../http-status/status_code');

const data = (data) => ({ err: null, data});

const paginationData = (data, meta) => ({ err: null, data, meta});

const error = (err) => ({ err, data: err.data || null });

const response = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    message = result.err.message || message;
    code = checkErrorCode(result.err);
  }
  res.status(code).send({
    success: status,
    data,
    message,
    code
  });
};

const paginationResponse = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    data = '';
    message = result.err;
  }
  res.status(code).send({
    success: status,
    data,
    meta: result.meta,
    message,
    code
  });
};

const responseDb = (result, message = '', code = 200) => {
  let data = (result) ? result.dataValues:null;

  // memastikan bahwa jika result adalah array, 
  // semua nilai dataValues dari setiap elemen akan diekstraksi 
  // dan dikumpulkan dalam satu array.
  if(Array.isArray(result)) {
    const list = new Array;
    for(let item of result) {
      const { dataValues } = item;
      list.push(dataValues);
    }

    data = list;
  };

  // Mengembalikan Objek Response
  return {err: (result)? null : true, data};
};

const signResponse = (res, result, message = '', code = 200) => {
  const { token, info:data } = result.data;
  res.status(code)
  .cookie('token', token, {
    httpOnly: true, // menjaga cookie tetap aman dari akses JavaScript
    secure: process.env.NODE_ENV === 'production', // Hanya mengirim cookie melalui HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Mengatur SameSite untuk menghindari masalah dengan cross-site request
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
    path: '/', //tersedia untuk semua path
  }).send({
    success: true,
    data,
    message,
    code
  });
};

const signOutResponse = (res, message = '', code = 200) => {
  res.status(code).clearCookie('token').send({
    success: true,
    data: null,
    message,
    code
  });
};
const checkErrorCode = (error) => {

  switch (error.constructor) {
  case BadRequestError:
    return httpError.BAD_REQUEST;
  case ConflictError:
    return httpError.CONFLICT;
  case ExpectationFailedError:
    return httpError.EXPECTATION_FAILED;
  case ForbiddenError:
    return httpError.FORBIDDEN;
  case GatewayTimeoutError:
    return httpError.GATEWAY_TIMEOUT;
  case InternalServerError:
    return httpError.INTERNAL_ERROR;
  case NotFoundError:
    return httpError.NOT_FOUND;
  case ServiceUnavailableError:
    return httpError.SERVICE_UNAVAILABLE;
  case UnauthorizedError:
    return httpError.UNAUTHORIZED;
  case UnprocessableEntityError:
    return httpError.UNPROCESSABLE_ENTITY;
  default:
    return httpError.CONFLICT;
  }

};

module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse,
  responseDb,
  signResponse,
  signOutResponse
};
