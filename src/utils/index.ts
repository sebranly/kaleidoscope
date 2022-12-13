import { EPISODE_COUNT } from '../constants/general';
import { Color, Episode } from '../types';

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

export { getDotEmoji, getNumberEmoji, getNumberWord, getSquareEmoji, shuffleEpisodes };
