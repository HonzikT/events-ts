import { UserEvent } from './user-events.actions';
import {
  LoadRequestAction,
  LoadSuccessAction,
  LoadFailureAction,
} from './user-events.actions';
import UserEventsTypes from './user-events.types';

interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const INITIAL_STATE: UserEventsState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (
  state: UserEventsState = INITIAL_STATE,
  action: LoadSuccessAction
) => {
  switch (action.type) {
    // case UserEventsTypes.LOAD_REQUEST:
    //   break;

    case UserEventsTypes.LOAD_SUCCESS:
      return {
        ...state,
        allIds: action.payload.map((event) => event.id),
        byIds: action.payload.reduce<UserEventsState['byIds']>(
          (byIds, event) => {
            byIds[event.id] = event;
            return byIds;
          },
          {}
        ),
      };

    // case UserEventsTypes.LOAD_FAILURE:
    //   break;

    default:
      return state;
  }
};

export default userEventsReducer;
