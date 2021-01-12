import { UserEvent } from './user-events.actions';
import { LoadSuccessAction, CreateSuccessAction } from './user-events.actions';
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
  action: LoadSuccessAction | CreateSuccessAction
) => {
  switch (action.type) {
    case UserEventsTypes.LOAD_SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        allIds: events.map((event: { id: number }) => event.id),
        byIds: events.reduce<UserEventsState['byIds']>(
          (byIds: { [key: string]: UserEvent }, event: UserEvent) => {
            byIds[event.id] = event;
            return byIds;
          },
          {}
        ),
      };

    case UserEventsTypes.CREATE_SUCCESS:
      const { event } = action.payload;

      return {
        ...state,
        allIds: [...state.allIds, event.id],
        byIds: { ...state.byIds, [event.id]: event },
      };

    default:
      return state;
  }
};

export default userEventsReducer;
