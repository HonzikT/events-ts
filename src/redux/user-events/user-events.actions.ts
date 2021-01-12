import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../root-reducer';

import { selectRecorderDateStart } from '../recorder/recorder.selectors';

import UserEventsTypes from './user-events.types';

export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

// Get initial events data
// LOAD INITIAL REQUEST
export interface LoadRequestAction
  extends Action<typeof UserEventsTypes.LOAD_REQUEST> {}

export const loadRequest = (): LoadRequestAction => ({
  type: UserEventsTypes.LOAD_REQUEST,
});

// LOAD SUCCESS
export interface LoadSuccessAction
  extends Action<typeof UserEventsTypes.LOAD_SUCCESS> {
  payload: { events: UserEvent[] };
}

export const loadSuccess = (payload: UserEvent[]): LoadSuccessAction => ({
  type: UserEventsTypes.LOAD_SUCCESS,
  payload: { events: payload },
});

// LOAD FAILURE
export interface LoadFailureAction
  extends Action<typeof UserEventsTypes.LOAD_FAILURE> {
  error: string;
}

export const loadFailure = (payload: string): LoadFailureAction => ({
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

// Create User Event
// INITIAL REQUEST
export interface CreateRequestAction
  extends Action<typeof UserEventsTypes.CREATE_REQUEST> {}

export const createRequest = (): CreateRequestAction => ({
  type: UserEventsTypes.CREATE_REQUEST,
});

// REQUEST SUCCESSFUL
export interface CreateSuccessAction
  extends Action<typeof UserEventsTypes.CREATE_SUCCESS> {
  payload: { event: UserEvent };
}

export const createSuccess = (payload: UserEvent): CreateSuccessAction => ({
  type: UserEventsTypes.CREATE_SUCCESS,
  payload: { event: payload },
});

// REQUEST FAILED
export interface CreateFailureAction
  extends Action<typeof UserEventsTypes.CREATE_FAILURE> {}

export const createFailure = (): CreateFailureAction => ({
  type: UserEventsTypes.CREATE_FAILURE,
});

// THUNK ACTION
export const createUserEvent = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | CreateSuccessAction | CreateFailureAction
> => async (dispatch, getState) => {
  dispatch(createRequest());

  try {
    const dateStart = selectRecorderDateStart(getState());
    const event: Omit<UserEvent, 'id'> = {
      title: 'No name',
      dateStart,
      dateEnd: new Date().toISOString(),
    };

    const response = await fetch(`http:localhost:3001/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify(event),
    });

    const createdEvent: UserEvent = await response.json();

    dispatch(createSuccess(createdEvent));
  } catch (err) {
    console.error(err);

    dispatch(createFailure());
  }
};
