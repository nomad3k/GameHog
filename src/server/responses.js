import * as ResponseCode from '../shared/response-codes';

export function ok() {
  return {
    ok: true,
    code: ResponseCode.OK,
    message: 'OK'
  };
}

export function badRequest(errors) {
  return {
    ok: false,
    code: ResponseCode.BAD_REQUEST,
    message: 'Bad Request',
    errors
  };
}

export function invalidRequest(errors) {
  return {
    ok: false,
    code: ResponseCode.INVALID_REQUEST,
    message: 'Invalid Request',
    errors
  };
}
