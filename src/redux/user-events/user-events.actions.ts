import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../root-reducer';

import { selectRecorderDateStart } from '../recorder/recorder.selectors';

import { UserEventsTypes } from './user-events.types';

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

    const response = await fetch(`http://localhost:3001/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

// Delete user event
// DELETE REQUEST
export interface DeleteRequestAction
  extends Action<typeof UserEventsTypes.DELETE_REQUEST> {}

export const deleteRequest = (): DeleteRequestAction => ({
  type: UserEventsTypes.DELETE_REQUEST,
});

// DELETE SUCCESS
export interface DeleteSuccessAction
  extends Action<typeof UserEventsTypes.DELETE_SUCCESS> {
  payload: UserEvent['id'];
}

export const deleteSuccess = (id: number): DeleteSuccessAction => ({
  type: UserEventsTypes.DELETE_SUCCESS,
  payload: id,
});

// DELETE FAILURE
export interface DeleteFailureAction
  extends Action<typeof UserEventsTypes.DELETE_FAILURE> {}

export const deleteFailure = (): DeleteFailureAction => ({
  type: UserEventsTypes.DELETE_FAILURE,
});

// THUNK ACTION
export const deleteUserEvent = (
  id: UserEvent['id']
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  DeleteRequestAction | DeleteSuccessAction | DeleteFailureAction
> => async (dispatch) => {
  dispatch(deleteRequest());

  try {
    const response = await fetch(`http://localhost:3001/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteSuccess(id));
    }
  } catch (err) {
    console.error(err);

    dispatch(deleteFailure());
  }
};

// Update title event
// UPDATE REQUEST
export interface UpdateRequestAction
  extends Action<typeof UserEventsTypes.UPDATE_REQUEST> {}

export const updateRequest = (): UpdateRequestAction => ({
  type: UserEventsTypes.UPDATE_REQUEST,
});

// UPDATE SUCCESSFUL
export interface UpdateSuccessAction
  extends Action<typeof UserEventsTypes.UPDATE_SUCCESS> {
  payload: { event: UserEvent };
}

export const updateSuccess = (payload: UserEvent): UpdateSuccessAction => ({
  type: UserEventsTypes.UPDATE_SUCCESS,
  payload: { event: payload },
});

// UPDATE FAILED
export interface UpdateFailureAction
  extends Action<typeof UserEventsTypes.UPDATE_FAILURE> {}

export const updateFailure = (): UpdateFailureAction => ({
  type: UserEventsTypes.UPDATE_FAILURE,
});

// THUNK ACTION
export const updateUserEvent = (
  event: UserEvent
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  UpdateRequestAction | UpdateSuccessAction | UpdateFailureAction
> => async (dispatch) => {
  dispatch(updateRequest());

  try {
    const response = await fetch(`http://localhost:3001/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const updatedEvent: UserEvent = await response.json();

    dispatch(updateSuccess(updatedEvent));
  } catch (err) {
    console.error(err);

    dispatch(updateFailure());
  }
};
