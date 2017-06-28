import * as Types from './types';

export function userRegistered({ userName, password }) {
  if (!userName) throw new Error('userName');
  if (!password) throw new Error('password');
  return {
    type: Types.USER_REGISTERED,
    userName, password
  };
}

export function userUnregistered({ userName }) {
  if (!userName) throw new Error('userName');
  return {
    type: Types.USER_UNREGISTERED,
    userName
  };
}
