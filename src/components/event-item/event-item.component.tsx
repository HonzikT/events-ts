import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from '../../redux/user-events/user-events.actions';

import { changeTimeFormat } from '../../lib/utils';

import './event-item.css';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const dispatch = useDispatch();

  const handleDeleteEvent = (): void => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = (): void => {
    setEditable(true);
  };

  const handleTitleBlur = (): void => {
    if (title !== event.title) {
      dispatch(updateUserEvent({ ...event, title }));
      setTitle(event.title);
    }
    setEditable(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(() => e.target.value);
  };

  // Focus input when clicked
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  return (
    <div key={event.id} className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">{`${changeTimeFormat(
          event.dateStart
        )} - ${changeTimeFormat(event.dateEnd)}`}</div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              className="calendar-event-input"
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              ref={inputRef}
            />
          ) : (
            <span className="calendar-event-span" onClick={handleTitleClick}>
              {event.title}
            </span>
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteEvent}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
