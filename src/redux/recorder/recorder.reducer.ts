import { StartAction, StopAction } from './recorder.actions';
import { RecorderTypes } from './recorder.types';

interface RecorderState {
  dateStart: string;
}

const INITIAL_STATE: RecorderState = {
  dateStart: '',
};

const recorderReducer = (
  state: RecorderState = INITIAL_STATE,
  action: StartAction | StopAction
) => {
  switch (action.type) {
    case RecorderTypes.START_RECORDING:
      return { ...state, dateStart: new Date().toISOString() };

    case RecorderTypes.STOP_RECORDING:
      return { ...state, dateStart: '' };

    default:
      return state;
  }
};

export default recorderReducer;
