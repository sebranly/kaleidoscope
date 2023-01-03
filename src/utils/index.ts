import { EPISODE_COUNT } from '../constants/general';
import { Color, Direction, Episode, TimeUnits } from '../types';

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

const getHeartEmoji = (color: Color) => {
  const { Yellow, Green, Blue, Violet, Orange, Red, Pink, White } = Color;
  switch (color) {
    case Yellow:
      return '💛';
    case Green:
      return '💚';
    case Blue:
      return '💙';
    case Violet:
      return '💜';
    case Orange:
      return '🧡';
    case Red:
      return '❤️';
    case Pink:
      return '💗';
    case White:
      return '🤍';
    default:
      return '🖤';
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

const copyEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = episodes.slice(0, EPISODE_COUNT);

  return copiedEpisodes;
};

const getEpisodeByColor = (episodes: Episode[], color: Color) => {
  const colorEpisode = episodes.filter((episode: Episode) => episode.color === color);
  return colorEpisode.length ? colorEpisode[0] : null;
};

const shuffleEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);
  const shuffledEpisodes = copiedEpisodes.sort(() => Math.random() - 0.5);

  return shuffledEpisodes;
};

// Source: https://media.netflix.com/en/only-on-netflix/80992058
/*
  The compelling crime anthology series takes a non-linear approach to storytelling,
  building intrigue and suspense uniquely, with Netflix members each having a different immersive viewing experience.
  Some members may start with certain episodes (like episodes “Yellow or “Green”),
  then move deeper into their own personal viewing order with varying episodes
  (“Blue” or “Violet” or “Orange,” followed by “Red” or “Pink”)
  until the epic “White: The Heist” story finale.
*/
const netflixShuffleEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);

  const [yellow, green, blue, violet, orange, red, pink, white] = [
    Color.Yellow,
    Color.Green,
    Color.Blue,
    Color.Violet,
    Color.Orange,
    Color.Red,
    Color.Pink,
    Color.White
  ].map((color: Color) => {
    const colorEpisode = getEpisodeByColor(copiedEpisodes, color);

    return colorEpisode!;
  });

  const firstGroup = shuffleEpisodes([yellow, green]);
  const secondGroup = shuffleEpisodes([blue, violet, orange]);
  const thirdGroup = shuffleEpisodes([red, pink]);

  return [...firstGroup, ...secondGroup, ...thirdGroup, white];
};

const sortToDefaultEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);
  const defaultEpisodes = copiedEpisodes.sort((ep1: Episode, ep2: Episode) => ep1.defaultNumber - ep2.defaultNumber);

  return defaultEpisodes;
};

const sortToRainbowEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);

  const rainbowEpisodes = [
    Color.Red,
    Color.Orange,
    Color.Yellow,
    Color.Green,
    Color.Blue,
    Color.Violet,
    Color.Pink,
    Color.White
  ].map((color: Color) => {
    return getEpisodeByColor(copiedEpisodes, color)!;
  });

  return rainbowEpisodes;
};

const sortToChronologicalEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);
  const chronologicalEpisodes = copiedEpisodes.sort(
    (ep1: Episode, ep2: Episode) => ep1.hoursFromHeist - ep2.hoursFromHeist
  );

  return chronologicalEpisodes;
};

const reverseEpisodes = (episodes: Episode[]) => {
  const copiedEpisodes = copyEpisodes(episodes);
  const reversedEpisodes = copiedEpisodes.reverse();

  return reversedEpisodes;
};

const swapEpisodes = (episodes: Episode[], direction: Direction, index: number) => {
  const cannotGoUp = direction === Direction.Up && index <= 0;
  const cannotGoDown = direction === Direction.Down && index >= EPISODE_COUNT - 1;

  if (cannotGoUp || cannotGoDown) return episodes;
  const copiedEpisodes = copyEpisodes(episodes);

  const delta = direction === Direction.Up ? -1 : 1;
  const episodeTemp = copiedEpisodes[index];
  copiedEpisodes[index] = copiedEpisodes[index + delta];
  copiedEpisodes[index + delta] = episodeTemp;

  return copiedEpisodes;
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
  copyEpisodes,
  getCurrentTimestamp,
  getEpisodeByColor,
  getHeartEmoji,
  getNumberEmoji,
  netflixShuffleEpisodes,
  pluralize,
  reverseEpisodes,
  shuffleEpisodes,
  sortToChronologicalEpisodes,
  sortToDefaultEpisodes,
  sortToRainbowEpisodes,
  swapEpisodes
};
