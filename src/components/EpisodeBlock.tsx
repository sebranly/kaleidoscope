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
  const isOneBeforeLast = index === EPISODE_COUNT - 2;
  const isLast = index === EPISODE_COUNT - 1;
  const bgColor = `bg-color-${color}`;

  const onClick = (direction: Direction) => {
    const episodesListBis = swapEpisodes(episodesList, direction, index);

    setEpisodesList(episodesListBis);
  };

  return (
    <div className="episode-block">
      <div className={`episode-ribbon-number1-index${index} episode-ribbon ${bgColor}`} />
      <div className={`episode-ribbon-number2-index${index} episode-ribbon ${bgColor}`} />
      <div className={`episode-ribbon-number3-index${index} episode-ribbon ${bgColor}`} />
      <div className={`episode-content`}>
        <div className={`episode-header`}>
          {!isFirst && !isLast && (
            <button className="episode-arrow episode-up" onClick={() => onClick(Direction.Up)}>
              🔼
            </button>
          )}
          {isFirst && <div></div>}
          {isLast && <div className="episode-locked">🔒</div>}
          <>{title}</>
          {!isOneBeforeLast && !isLast ? (
            <button className="episode-arrow episode-down" onClick={() => onClick(Direction.Down)}>
              🔽
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`episode-content-separator ${bgColor}`}></div>
        <div className="episode-details">
          <div className="episode-writers">
            <b>{writersCopy}:</b> {writers.join(', ')}
          </div>
          {director && (
            <div className="episode-director">
              <b>Director:</b> {director}
            </div>
          )}
          <div className="episode-number">
            <b>Episode:</b> #{defaultNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EpisodeBlock };
