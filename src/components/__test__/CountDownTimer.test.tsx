import * as React from 'react';
import { render } from '@testing-library/react';
import { CountDownTimer } from '../CountDownTimer';
import { getCurrentTimestamp } from '../../utils';

test('CountDownTimer', () => {
  const endTime = getCurrentTimestamp() + 3662;
  const createComponent = () => <CountDownTimer endTime={endTime} />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
