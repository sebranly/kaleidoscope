import * as React from 'react';
import { EPISODE_COUNT } from '../constants/general';
import { Direction, Episode } from '../types';
import { pluralize, swapEpisodes } from '../utils';

export interface EpisodeBlockProps {
  episode: Episode;
  index: number;
  episodesList: Episode[];
  setEpisodesList: React.Dispatch<React.SetStateAction<Episode[]>>;
}

const EpisodeBlock: React.FC<EpisodeBlockProps> = (props) => {
  const { episode, episodesList, index, setEpisodesList } = props;
  const { color, defaultNumber, director, title, writers } = episode;

  const writersCopy = pluralize('Writer', writers.length);
  const isFirst = index === 0;
  const isLast = index === EPISODE_COUNT - 1;

  const onClick = (direction: Direction) => {
    const episodesListBis = swapEpisodes(episodesList, direction, index);

    setEpisodesList(episodesListBis);
  };

  return (
    <div className="episode-block">
      <div className="episode-header">
        {!isFirst && (
          <button className="episode-arrow episode-up" onClick={() => onClick(Direction.Up)}>
            🔼
          </button>
        )}
        <>{title}</>
        {!isLast && (
          <button className="episode-arrow episode-down" onClick={() => onClick(Direction.Down)}>
            🔽
          </button>
        )}
      </div>
      <div className={`episode-content-separator bg-color-${color}`}></div>
      <div className="episode-content">
        <div className="episode-director">
          <b>Director:</b> {director}
        </div>
        <div className="episode-writers">
          <b>{writersCopy}:</b> {writers.join(', ')}
        </div>
        <div className="episode-number">
          <b>Episode</b> {defaultNumber}
        </div>
      </div>
    </div>
  );
};

export { EpisodeBlock };
