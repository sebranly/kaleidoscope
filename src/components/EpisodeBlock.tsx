import * as React from 'react';
import { EPISODE_COUNT } from '../constants/general';
import { Episode } from '../types';
import { getDotEmoji, getNumberEmoji, getNumberWord, getSquareEmoji } from '../utils';

export interface EpisodeBlockProps {
  episode: Episode;
  index: number;
}

const EpisodeBlock: React.FC<EpisodeBlockProps> = (props) => {
  const { episode, index } = props;
  const { color, defaultNumber, director, title, writers } = episode;

  const classnamesHeader = `episode-header bg-color-${color}`;
  const writersSuffix = writers.length > 1 ? 's' : '';
  const isFirst = index === 0;
  const isOneBeforeLast = index === EPISODE_COUNT - 2;
  const isLast = index === EPISODE_COUNT - 1;

  return (
    <div className="episode-block">
      <div className={classnamesHeader}>
        {!isFirst && !isLast && <div className="episode-up">🔼</div>}
        <>{title}</>
        {!isOneBeforeLast && !isLast && <div className="episode-down">🔽</div>}
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
          <b>Color:</b> {getDotEmoji(color)} {getSquareEmoji(color)} {color}
        </div>
        <div className="episode-number">
          <b>Episode Number:</b> {getNumberEmoji(defaultNumber)} {getNumberWord(defaultNumber)}
        </div>
      </div>
    </div>
  );
};

export { EpisodeBlock };
