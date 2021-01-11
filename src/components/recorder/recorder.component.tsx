import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  startRecording,
  stopRecording,
} from '../../redux/recorder/recorder.actions';
import { selectRecorderDateStart } from '../../redux/recorder/recorder.selectors';

import './recorder.css';

// Util function, adds 0 if the number in time rendered is single digit
const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const Recorder = () => {
  // State used to rerender component when interval changes
  const [, setCount] = useState<number>(0);

  const dispatch = useDispatch();
  const dateStart = useSelector(selectRecorderDateStart);

  // Checks if the recording started
  const started = dateStart !== '';

  let interval = useRef<number>(0);

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);

      dispatch(stopRecording());
    } else {
      dispatch(startRecording());

      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  // Time to be displayed in this components
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={`recorder ${started ? 'recorder-started' : ''}`}>
      <button className="recorder-record" onClick={handleClick}>
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
