import * as React from 'react';
import { convertSecondsToUnits, convertToTwoDigits, pluralize } from '../utils';

export interface CountDownTimerProps {
  remainingSeconds: number;
}

const CountDownTimer: React.FC<CountDownTimerProps> = (props) => {
  const { remainingSeconds } = props;

  const [remainingSecondsBis, setRemainingSecondsBis] = React.useState(remainingSeconds);

  const onMount = () => {
    const interval = setInterval(() => {
      setRemainingSecondsBis((prevValue: number) => {
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  // Note: StrictMode triggers useEffect twice on development hence the minus 2 seconds on each tick
  React.useEffect(() => {
    onMount();
  }, []);

  if (remainingSecondsBis <= 0) return null;

  const { days, hours, minutes, seconds } = convertSecondsToUnits(remainingSecondsBis);
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }

  const items = [
    { value: days, label: 'day' },
    { value: hours, label: 'hour' },
    { value: minutes, label: 'minute' },
    { value: seconds, label: 'second' }
  ].map((element: { value: number; label: string }) => {
    const { value, label } = element;
    return (
      <li className="count-down-timer-element" key={label}>
        <span>{convertToTwoDigits(value)}</span>
        <div className="count-down-timer-unit">{pluralize(label, value)}</div>
      </li>
    );
  });

  return (
    <div className="count-down">
      <h3>Countdown to show release</h3>
      <ul className="count-down-timer">{items}</ul>
    </div>
  );
};

export { CountDownTimer };
