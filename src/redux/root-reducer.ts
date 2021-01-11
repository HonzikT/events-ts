import { combineReducers } from 'redux';

import userEventsReducer from './user-events/user-events.reducer';
import recorderReducer from './recorder/recorder.reducer';

const rootReducer = combineReducers({
  user: userEventsReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
