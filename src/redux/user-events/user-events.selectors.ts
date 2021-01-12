import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUserEvents = (state: RootState) => state.userEvents;

export const selectUserEventsArray = createSelector(
  [selectUserEvents],
  (events) => events?.allIds.map((id: number) => events.byIds[id])
);
