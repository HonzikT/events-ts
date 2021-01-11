import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectRecorder = (state: RootState) => state.recorder;

export const selectRecorderDateStart = createSelector(
  [selectRecorder],
  (recorder) => recorder.dateStart
);
