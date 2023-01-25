import { Color, Direction, Episode } from '../../types';
import {
  convertSecondsToUnits,
  convertToTwoDigits,
  copyEpisodes,
  getEpisodeByColor,
  getHeartEmoji,
  netflixShuffleEpisodes,
  pluralize,
  reverseEpisodes,
  shuffleEpisodes,
  sortToChronologicalEpisodes,
  sortToDefaultEpisodes,
  sortToRainbowEpisodes,
  swapEpisodes
} from '../index';

const episodes: Episode[] = [
  {
    color: Color.Yellow,
    defaultNumber: 1,
    director: 'somebody',
    hoursFromHeist: -6 * 7 * 24,
    title: '6 Weeks Before the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Green,
    defaultNumber: 2,
    director: 'somebody',
    hoursFromHeist: -7 * 365 * 24,
    title: '7 Years Before the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Blue,
    defaultNumber: 3,
    director: 'somebody',
    hoursFromHeist: -5 * 24,
    title: '5 Days Before the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Violet,
    defaultNumber: 4,
    director: 'somebody',
    hoursFromHeist: -24 * 365 * 24,
    title: '24 Years Before the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Orange,
    defaultNumber: 5,
    director: 'somebody',
    hoursFromHeist: -3 * 7 * 24,
    title: '3 Weeks Before the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Red,
    defaultNumber: 6,
    director: 'somebody',
    hoursFromHeist: 12,
    title: 'The Morning After the Heist',
    writers: ['somebody']
  },
  {
    color: Color.Pink,
    defaultNumber: 7,
    director: 'somebody',
    hoursFromHeist: 6 * 30 * 24,
    title: '6 Months After the Heist',
    writers: ['somebody']
  },
  {
    color: Color.White,
    defaultNumber: 8,
    director: 'somebody',
    hoursFromHeist: 0,
    title: 'Finale: the Heist',
    writers: ['somebody', 'somebody']
  }
];

test('getHeartEmoji', () => {
  expect(getHeartEmoji(Color.Yellow)).toBe('💛');
  expect(getHeartEmoji(Color.Green)).toBe('💚');
  expect(getHeartEmoji(Color.Blue)).toBe('💙');
  expect(getHeartEmoji(Color.Violet)).toBe('💜');
  expect(getHeartEmoji(Color.Orange)).toBe('🧡');
  expect(getHeartEmoji(Color.Red)).toBe('❤️');
  expect(getHeartEmoji(Color.Pink)).toBe('💗');
  expect(getHeartEmoji(Color.White)).toBe('🤍');
});

test('getEpisodeByColor', () => {
  const redEpisode = getEpisodeByColor(episodes, Color.Red);
  expect(redEpisode).toStrictEqual({
    color: Color.Red,
    defaultNumber: 6,
    director: 'somebody',
    hoursFromHeist: 12,
    title: 'The Morning After the Heist',
    writers: ['somebody']
  });

  const noEpisode = getEpisodeByColor([], Color.Red);
  expect(noEpisode).toBeNull();
});

test('shuffleEpisodes', () => {
  const shuffledEpisodes = shuffleEpisodes(episodes);
  expect(shuffledEpisodes).toHaveLength(8);
});

test('netflixShuffleEpisodes', () => {
  const netflixShuffledEpisodes = netflixShuffleEpisodes(episodes);
  expect(netflixShuffledEpisodes).toHaveLength(8);
  expect(netflixShuffledEpisodes[7]).toStrictEqual(episodes[7]);
});

test('swapEpisodes', () => {
  const swappedEpisodes = swapEpisodes(episodes, Direction.Up, 2);
  expect(swappedEpisodes).toHaveLength(8);
  expect(swappedEpisodes).not.toEqual(episodes);

  expect(swappedEpisodes[0]).toStrictEqual(episodes[0]);

  expect(swappedEpisodes[1]).toStrictEqual(episodes[2]);
  expect(swappedEpisodes[2]).toStrictEqual(episodes[1]);

  expect(swappedEpisodes[3]).toStrictEqual(episodes[3]);
  expect(swappedEpisodes[4]).toStrictEqual(episodes[4]);
  expect(swappedEpisodes[5]).toStrictEqual(episodes[5]);
  expect(swappedEpisodes[6]).toStrictEqual(episodes[6]);
  expect(swappedEpisodes[7]).toStrictEqual(episodes[7]);
  expect(swappedEpisodes[8]).toStrictEqual(episodes[8]);
});

test('copyEpisodes', () => {
  const copiedEpisodes = copyEpisodes(episodes);
  expect(copiedEpisodes).toStrictEqual(episodes);
  expect(copiedEpisodes).not.toBe(episodes);
});

test('reverseEpisodes', () => {
  const reversedEpisodes = reverseEpisodes(episodes);
  expect(reversedEpisodes).toHaveLength(8);

  expect(reversedEpisodes[0]).toStrictEqual(episodes[7]);
  expect(reversedEpisodes[1]).toStrictEqual(episodes[6]);
  expect(reversedEpisodes[2]).toStrictEqual(episodes[5]);
  expect(reversedEpisodes[3]).toStrictEqual(episodes[4]);
  expect(reversedEpisodes[4]).toStrictEqual(episodes[3]);
  expect(reversedEpisodes[5]).toStrictEqual(episodes[2]);
  expect(reversedEpisodes[6]).toStrictEqual(episodes[1]);
  expect(reversedEpisodes[7]).toStrictEqual(episodes[0]);
});

test('sortToDefaultEpisodes', () => {
  const defaultEpisodes = sortToDefaultEpisodes(episodes);

  expect(defaultEpisodes).toStrictEqual(episodes);
});

test('sortToChronologicalEpisodes', () => {
  const chronologicalEpisodes = sortToChronologicalEpisodes(episodes);
  expect(chronologicalEpisodes).toHaveLength(8);

  expect(chronologicalEpisodes[0]).toStrictEqual(episodes[3]);
  expect(chronologicalEpisodes[1]).toStrictEqual(episodes[1]);
  expect(chronologicalEpisodes[2]).toStrictEqual(episodes[0]);
  expect(chronologicalEpisodes[3]).toStrictEqual(episodes[4]);
  expect(chronologicalEpisodes[4]).toStrictEqual(episodes[2]);
  expect(chronologicalEpisodes[5]).toStrictEqual(episodes[7]);
  expect(chronologicalEpisodes[6]).toStrictEqual(episodes[5]);
  expect(chronologicalEpisodes[7]).toStrictEqual(episodes[6]);
});

test('sortToRainbowEpisodes', () => {
  const rainbowEpisodes = sortToRainbowEpisodes(episodes);
  expect(rainbowEpisodes).toHaveLength(8);

  expect(rainbowEpisodes[0]).toStrictEqual(episodes[5]);
  expect(rainbowEpisodes[1]).toStrictEqual(episodes[4]);
  expect(rainbowEpisodes[2]).toStrictEqual(episodes[0]);
  expect(rainbowEpisodes[3]).toStrictEqual(episodes[1]);
  expect(rainbowEpisodes[4]).toStrictEqual(episodes[2]);
  expect(rainbowEpisodes[5]).toStrictEqual(episodes[3]);
  expect(rainbowEpisodes[6]).toStrictEqual(episodes[6]);
  expect(rainbowEpisodes[7]).toStrictEqual(episodes[7]);
});

test('pluralize', () => {
  expect(pluralize('word', -1)).toBe('word');
  expect(pluralize('word', 0)).toBe('words');
  expect(pluralize('word', 1)).toBe('word');
  expect(pluralize('word', 2)).toBe('words');
  expect(pluralize('word', 100)).toBe('words');
});

test('convertToTwoDigits', () => {
  expect(convertToTwoDigits(0)).toBe('00');
  expect(convertToTwoDigits(5)).toBe('05');
  expect(convertToTwoDigits(10)).toBe('10');
  expect(convertToTwoDigits(100)).toBe('100');
});

test('convertSecondsToUnits', () => {
  expect(convertSecondsToUnits(-1)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(0)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(1)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1
  });

  expect(convertSecondsToUnits(60)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 0
  });

  expect(convertSecondsToUnits(61)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 1
  });

  expect(convertSecondsToUnits(3599)).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 59,
    seconds: 59
  });

  expect(convertSecondsToUnits(3600)).toStrictEqual({
    days: 0,
    hours: 1,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(86400)).toStrictEqual({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
});
