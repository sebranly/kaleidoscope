import * as React from 'react';
import { TimeLabel } from '../types';
import { convertSecondsToUnits, convertToTwoDigits, getCurrentTimestamp, pluralize } from '../utils';

export interface CountDownTimerProps {
  endTime: number;
}

const CountDownTimer: React.FC<CountDownTimerProps> = (props) => {
  const [currentTimestamp, setCurrentTimestamp] = React.useState(getCurrentTimestamp());

  const { endTime } = props;

  const onMount = () => {
    const interval = setInterval(() => {
      setCurrentTimestamp(getCurrentTimestamp());
    }, 1000);

    return () => clearInterval(interval);
  };

  React.useEffect(() => {
    onMount();
  }, []);

  const remainingSeconds = endTime - currentTimestamp;

  if (remainingSeconds <= 0) return null;

  const { days, hours, minutes, seconds } = convertSecondsToUnits(remainingSeconds);
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }

  const isFixedDays = days === 0;
  const isFixedHours = isFixedDays && hours === 0;
  const isFixedMinutes = isFixedHours && minutes === 0;

  const items = [
    { value: days, label: TimeLabel.Day },
    { value: hours, label: TimeLabel.Hour },
    { value: minutes, label: TimeLabel.Minute },
    { value: seconds, label: TimeLabel.Second }
  ].map((element: { value: number; label: string }) => {
    const { value, label: l } = element;
    const isFixed =
      (l === TimeLabel.Day && isFixedDays) ||
      (l === TimeLabel.Hour && isFixedHours) ||
      (l === TimeLabel.Minute && isFixedMinutes);

    const classnamesValue = isFixed ? 'color-light-blue' : '';

    return (
      <li className="count-down-timer-element" key={l}>
        <span className={classnamesValue}>{convertToTwoDigits(value)}</span>
        <div className="count-down-timer-unit">{pluralize(l, value)}</div>
      </li>
    );
  });

  return (
    <div className="count-down">
      <h3>Countdown to Series Premiere</h3>
      <ul className="count-down-timer">{items}</ul>
    </div>
  );
};

export { CountDownTimer };
