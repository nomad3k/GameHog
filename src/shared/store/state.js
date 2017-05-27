import { fromJS } from 'immutable';

export const PLAYERS = 'players';
export const USERS = 'users';
export const CLIENTS = 'clients';

export const initialState = fromJS({
  [CLIENTS]: { },
  [USERS]: { },
  [PLAYERS]: { }
});
