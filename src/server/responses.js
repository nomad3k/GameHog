import * as ResponseCode from '../shared/response-code';

export function ok() {
  return {
    ok: true,
    code: ResponseCode.OK,
    message: 'OK'
  };
}

export function authRequired(errors) {
  return {
    ok: false,
    code: ResponseCode.AUTH_REQUIRED,
    message: 'Authentication required',
    errors
  };
}

export function anonRequire(errors) {
  return {
    ok: false,
    code: ResponseCode.ANON_REQUIRED,
    message: 'Anonymous required',
    errors
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

export function invalidOperation(errors) {
  return {
    ok: false,
    code: ResponseCode.INVALID_OPERATION,
    message: 'Invalid Operation',
    errors
  };
}

export function notImplemented() {
  return {
    ok: false,
    code: ResponseCode.NOT_IMPLEMENTED
  };
}
