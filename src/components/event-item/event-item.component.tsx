import React from 'react';
import { useDispatch } from 'react-redux';

import {
  UserEvent,
  deleteUserEvent,
} from '../../redux/user-events/user-events.actions';

import { changeTimeFormat } from '../../lib/utils';

import './event-item.css';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserEvent(event.id));
  };

  return (
    <div key={event.id} className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">{`${changeTimeFormat(
          event.dateStart
        )} - ${changeTimeFormat(event.dateEnd)}`}</div>
        <div className="calendar-event-title">{event.title}</div>
      </div>
      <button className="calendar-event-delete-button" onClick={handleDelete}>
        &times;
      </button>
    </div>
  );
};

export default EventItem;
