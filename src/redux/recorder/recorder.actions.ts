import { Action } from 'redux';

import RecorderTypes from './recorder.types';

export type StartAction = Action<typeof RecorderTypes.START_RECORDING>;
export type StopAction = Action<typeof RecorderTypes.STOP_RECORDING>;

export const startRecording = (): StartAction => ({
  type: RecorderTypes.START_RECORDING,
});

export const stopRecording = (): StopAction => ({
  type: RecorderTypes.STOP_RECORDING,
});
