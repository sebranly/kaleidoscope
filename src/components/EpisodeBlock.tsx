import * as React from 'react';
import { EPISODE_COUNT } from '../constants/general';
import { Color, Direction, Episode } from '../types';
import { getDotEmoji, getNumberEmoji, getNumberWord, swapEpisodes } from '../utils';

export interface EpisodeBlockProps {
  episode: Episode;
  index: number;
  episodesList: Episode[];
  setEpisodesList: React.Dispatch<React.SetStateAction<Episode[]>>;
}

const EpisodeBlock: React.FC<EpisodeBlockProps> = (props) => {
  const { episode, episodesList, index, setEpisodesList } = props;
  const { color, defaultNumber, director, title, writers } = episode;

  const classnamesHeader = `episode-header bg-color-${color}`;
  const writersSuffix = writers.length > 1 ? 's' : '';
  const isFirst = index === 0;
  const isOneBeforeLast = index === EPISODE_COUNT - 2;
  const isLast = index === EPISODE_COUNT - 1;

  const onClick = (direction: Direction) => {
    const episodesListBis = swapEpisodes(episodesList, direction, index);

    setEpisodesList(episodesListBis);
  };

  return (
    <div className="episode-block">
      <div className={classnamesHeader}>
        {!isFirst && !isLast && (
          <button className="episode-arrow episode-up" onClick={() => onClick(Direction.Up)}>
            🔼
          </button>
        )}
        {isLast && <div className="episode-locked">🔒</div>}
        <>{title}</>
        {!isOneBeforeLast && !isLast && (
          <button className="episode-arrow episode-down" onClick={() => onClick(Direction.Down)}>
            🔽
          </button>
        )}
      </div>
      <div className="episode-content">
        <div className="episode-writers">
          <b>Writer{writersSuffix}:</b> {writers.join(', ')}
        </div>
        {director && (
          <div className="episode-director">
            <b>Director:</b> {director}
          </div>
        )}

        <div className="episode-color">
          <b>Color:</b> {getDotEmoji(color)} {color === Color.Pink ? `brown (instead of ${color})` : color}
        </div>
        <div className="episode-number">
          <b>Episode Number:</b> {getNumberEmoji(defaultNumber)} {getNumberWord(defaultNumber)}
        </div>
      </div>
    </div>
  );
};

export { EpisodeBlock };
