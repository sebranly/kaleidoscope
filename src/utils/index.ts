import { EPISODE_COUNT } from '../constants/general';
import { Color, Direction, Episode, TimeUnits } from '../types';

const getSquareEmoji = (color: Color) => {
  const { Yellow, Green, Blue, Violet, Orange, Red, Pink, White } = Color;
  switch (color) {
    case Yellow:
      return '🟨';
    case Green:
      return '🟩';
    case Blue:
      return '🟦';
    case Violet:
      return '🟪';
    case Orange:
      return '🟧';
    case Red:
      return '🟥';
    case Pink:
      return '🟫';
    case White:
      return '⬜';
    default:
      return '⬛';
  }
};

const getDotEmoji = (color: Color) => {
  const { Yellow, Green, Blue, Violet, Orange, Red, Pink, White } = Color;
  switch (color) {
    case Yellow:
      return '🟡';
    case Green:
      return '🟢';
    case Blue:
      return '🔵';
    case Violet:
      return '🟣';
    case Orange:
      return '🟠';
    case Red:
      return '🔴';
    case Pink:
      return '🟤';
    case White:
      return '⚪';
    default:
      return '⚫';
  }
};

const getNumberEmoji = (nb: number) => {
  switch (nb) {
    case 1:
      return '1️⃣';
    case 2:
      return '2️⃣';
    case 3:
      return '3️⃣';
    case 4:
      return '4️⃣';
    case 5:
      return '5️⃣';
    case 6:
      return '6️⃣';
    case 7:
      return '7️⃣';
    case 8:
      return '8️⃣';
    default:
      return '#️⃣';
  }
};

const getNumberWord = (nb: number) => {
  switch (nb) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    default:
      return 'unknown';
  }
};

const shuffleEpisodes = (episodes: Episode[]) => {
  // The finale has to be watched last
  const randomOrderEpisodes = episodes.slice(0, EPISODE_COUNT - 1);
  return [...randomOrderEpisodes.sort(() => Math.random() - 0.5), episodes[EPISODE_COUNT - 1]];
};

const swapEpisodes = (episodes: Episode[], direction: Direction, index: number) => {
  // The finale has to be watched last
  const firstEpisodes = episodes.slice(0, EPISODE_COUNT - 1);

  const cannotGoUp = direction === Direction.Up && index <= 0;
  const cannotGoDown = direction === Direction.Down && index >= EPISODE_COUNT - 2;

  if (cannotGoUp || cannotGoDown) return episodes;

  const delta = direction === Direction.Up ? -1 : 1;
  const episodeTemp = firstEpisodes[index];
  firstEpisodes[index] = firstEpisodes[index + delta];
  firstEpisodes[index + delta] = episodeTemp;

  return [...firstEpisodes, episodes[EPISODE_COUNT - 1]];
};

const pluralize = (str: string, nb: number) => {
  if (nb === 1 || nb < 0) return str;

  return `${str}s`;
};

const convertSecondsToUnits = (seconds: number): TimeUnits => {
  if (seconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsBis = Math.floor(seconds % 60);

  return {
    days,
    hours,
    minutes,
    seconds: secondsBis
  };
};

const convertToTwoDigits = (nb: number) => {
  if (nb < 10) return `0${nb}`;
  return `${nb}`;
};

export {
  convertSecondsToUnits,
  convertToTwoDigits,
  getDotEmoji,
  getNumberEmoji,
  getNumberWord,
  getSquareEmoji,
  pluralize,
  shuffleEpisodes,
  swapEpisodes
};
