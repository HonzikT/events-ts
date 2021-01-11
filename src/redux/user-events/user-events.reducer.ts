import { AnyAction } from 'redux';

import { UserEvent } from './user-events.actions'

interface UserState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const INITIAL_STATE: UserState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (state: UserState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userEventsReducer;
