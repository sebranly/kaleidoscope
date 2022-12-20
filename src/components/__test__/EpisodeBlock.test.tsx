import * as React from 'react';
import { render } from '@testing-library/react';

import { EpisodeBlock } from '../EpisodeBlock';
import { Color, Episode } from '../../types';

test('EpisodeBlock', () => {
  const episode: Episode = {
    color: Color.Red,
    defaultNumber: 1,
    director: 'TBA',
    hoursFromHeist: -24,
    title: 'Some title',
    writers: ['Someone', 'Someone else']
  };

  const fn = jest.fn();
  const createComponent = () => (
    <EpisodeBlock episode={episode} index={1} episodesList={[episode]} setEpisodesList={fn} />
  );

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
