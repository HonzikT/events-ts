import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../root-reducer';

import UserEventsTypes from './user-events.types';

export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

// LOAD INITIAL REQUEST
export interface LoadRequestAction
  extends Action<typeof UserEventsTypes.LOAD_REQUEST> {}

export const loadRequest = () => ({
  type: UserEventsTypes.LOAD_REQUEST,
});

// LOAD SUCCESS
export interface LoadSuccessAction
  extends Action<typeof UserEventsTypes.LOAD_SUCCESS> {
  payload: UserEvent[];
}

export const loadSuccess = (payload: UserEvent[]) => ({
  type: UserEventsTypes.LOAD_SUCCESS,
  payload,
});

// LOAD FAILURE
export interface LoadFailureAction
  extends Action<typeof UserEventsTypes.LOAD_FAILURE> {
  error: string;
}

export const loadFailure = (payload: string) => ({
  type: UserEventsTypes.LOAD_FAILURE,
  error: payload,
});

// THUNK ACTION
export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
  dispatch(loadRequest());

  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvent[] = await response.json();

    dispatch(loadSuccess(events));
  } catch (err) {
    console.error(err);

    dispatch(loadFailure('Failed to load events'));
  }
};
