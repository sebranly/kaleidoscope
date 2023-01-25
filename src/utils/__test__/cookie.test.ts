import { EPISODE_COUNT } from '../../constants/general';
import { Color, Episode } from '../../types';
import { convertEpisodesToColors, sanitizeEpisodesCountCookie, sanitizeEpisodesOrderCookie } from '../cookie';

const eric = 'Eric Garcia';
const evan = 'Evan Endicott';
const everardo = 'Everardo Gout';
const garrett = 'Garrett Lerner';
const josh = 'Josh Stoddard';
const kalen = 'Kalen Egan';
const kate = 'Kate Barnow';
const mairzee = 'Mairzee Almas';
const ning = 'Ning Zhou';
const robert = 'Robert Townsend';
const russell = 'Russell Fine';

const episodes: Episode[] = [
  {
    color: Color.White,
    defaultNumber: 8,
    director: russell,
    hoursFromHeist: 0,
    title: 'The Heist (Finale)',
    writers: [eric]
  },
  {
    color: Color.Yellow,
    defaultNumber: 1,
    director: everardo,
    hoursFromHeist: -6 * 7 * 24,
    title: '6 Weeks Before the Heist',
    writers: [eric]
  },
  {
    color: Color.Green,
    defaultNumber: 2,
    director: robert,
    hoursFromHeist: -7 * 365 * 24,
    title: '7 Years Before the Heist',
    writers: [evan, josh]
  },
  {
    color: Color.Blue,
    defaultNumber: 3,
    director: everardo,
    hoursFromHeist: -5 * 24,
    title: '5 Days Before the Heist',
    writers: [garrett]
  },
  {
    color: Color.Orange,
    defaultNumber: 4,
    director: mairzee,
    hoursFromHeist: -3 * 7 * 24,
    title: '3 Weeks Before the Heist',
    writers: [kate]
  },
  {
    color: Color.Violet,
    defaultNumber: 5,
    director: robert,
    hoursFromHeist: -24 * 365 * 24,
    title: '24 Years Before the Heist',
    writers: [ning]
  },
  {
    color: Color.Red,
    defaultNumber: 6,
    director: russell,
    hoursFromHeist: 12,
    title: 'The Morning After the Heist',
    writers: [eric]
  },
  {
    color: Color.Pink,
    defaultNumber: 7,
    director: mairzee,
    hoursFromHeist: 6 * 30 * 24,
    title: '6 Months After the Heist',
    writers: [kalen]
  }
];

test('convertEpisodesToColors', () => {
  expect(convertEpisodesToColors(episodes)).toStrictEqual([
    Color.White,
    Color.Yellow,
    Color.Green,
    Color.Blue,
    Color.Orange,
    Color.Violet,
    Color.Red,
    Color.Pink
  ]);
});

test('sanitizeEpisodesOrderCookie', () => {
  expect(sanitizeEpisodesOrderCookie(null)).toBeNull();
  expect(sanitizeEpisodesOrderCookie('')).toBeNull();
  expect(sanitizeEpisodesOrderCookie(0)).toBeNull();
  expect(sanitizeEpisodesOrderCookie('0')).toBeNull();
  expect(sanitizeEpisodesOrderCookie([])).toBeNull();
  expect(sanitizeEpisodesOrderCookie(undefined)).toBeNull();
  expect(sanitizeEpisodesOrderCookie({})).toBeNull();

  expect(sanitizeEpisodesOrderCookie([null])).toBeNull();
  expect(sanitizeEpisodesOrderCookie([''])).toBeNull();
  expect(sanitizeEpisodesOrderCookie([0])).toBeNull();
  expect(sanitizeEpisodesOrderCookie(['0'])).toBeNull();
  expect(sanitizeEpisodesOrderCookie([[]])).toBeNull();
  expect(sanitizeEpisodesOrderCookie([undefined])).toBeNull();
  expect(sanitizeEpisodesOrderCookie([{}])).toBeNull();

  expect(sanitizeEpisodesOrderCookie(['yellow', 'green', 'blue', 'orange', 'violet', 'red', 'pink'])).toBeNull();

  expect(sanitizeEpisodesOrderCookie([0, 'yellow', 'green', 'blue', 'orange', 'violet', 'red', 'pink'])).toBeNull();

  expect(
    sanitizeEpisodesOrderCookie(['someimaginarycolor', 'yellow', 'green', 'blue', 'orange', 'violet', 'red', 'pink'])
  ).toBeNull();

  expect(
    sanitizeEpisodesOrderCookie(['yellow', 'yellow', 'green', 'blue', 'orange', 'violet', 'red', 'pink'])
  ).toBeNull();

  expect(
    sanitizeEpisodesOrderCookie(['white', 'yellow', 'green', 'blue', 'orange', 'violet', 'red', 'pink'])
  ).toStrictEqual(episodes);
});

test('sanitizeEpisodesCountCookie', () => {
  expect(sanitizeEpisodesCountCookie(null)).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie('')).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie(0)).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie('0')).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie(undefined)).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie({})).toBe(EPISODE_COUNT);

  expect(sanitizeEpisodesCountCookie([null])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([''])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([0])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie(['0'])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([[]])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([undefined])).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie([{}])).toBe(EPISODE_COUNT);

  expect(sanitizeEpisodesCountCookie(-1)).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie(9)).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie('-1')).toBe(EPISODE_COUNT);
  expect(sanitizeEpisodesCountCookie('9')).toBe(EPISODE_COUNT);

  expect(sanitizeEpisodesCountCookie(1)).toBe(1);
  expect(sanitizeEpisodesCountCookie(2)).toBe(2);
  expect(sanitizeEpisodesCountCookie(3)).toBe(3);
  expect(sanitizeEpisodesCountCookie(4)).toBe(4);
  expect(sanitizeEpisodesCountCookie(5)).toBe(5);
  expect(sanitizeEpisodesCountCookie(6)).toBe(6);
  expect(sanitizeEpisodesCountCookie(7)).toBe(7);
  expect(sanitizeEpisodesCountCookie(8)).toBe(8);

  expect(sanitizeEpisodesCountCookie('1')).toBe(1);
  expect(sanitizeEpisodesCountCookie('2')).toBe(2);
  expect(sanitizeEpisodesCountCookie('3')).toBe(3);
  expect(sanitizeEpisodesCountCookie('4')).toBe(4);
  expect(sanitizeEpisodesCountCookie('5')).toBe(5);
  expect(sanitizeEpisodesCountCookie('6')).toBe(6);
  expect(sanitizeEpisodesCountCookie('7')).toBe(7);
  expect(sanitizeEpisodesCountCookie('8')).toBe(8);
});
