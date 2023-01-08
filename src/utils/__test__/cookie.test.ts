import { EPISODE_COUNT } from '../../constants/general';
import { Color, Episode } from '../../types';
import {convertEpisodesToColors, sanitizeEpisodesCountCookie, sanitizeEpisodesOrderCookie } from '../cookie';

const episodes: Episode[] = [
  {
    color: Color.White,
    defaultNumber: 8,
    hoursFromHeist: 0,
    title: 'The Heist (Finale)',
    writers: ['Evan Endicott', 'Josh Stoddard']
  },
  {
    color: Color.Yellow,
    defaultNumber: 1,
    director: 'José Padilha',
    hoursFromHeist: -6 * 7 * 24,
    title: '6 Weeks Before The Heist',
    writers: ['Eric Garcia']
  },
  {
    color: Color.Green,
    defaultNumber: 2,
    director: 'José Padilha',
    hoursFromHeist: -7 * 365 * 24,
    title: '7 Years Before The Heist',
    writers: ['Eric Garcia']
  },
  {
    color: Color.Blue,
    defaultNumber: 3,
    hoursFromHeist: -5 * 24,
    title: '5 Days Before The Heist',
    writers: ['Eric Garcia']
  },
  {
    color: Color.Violet,
    defaultNumber: 4,
    hoursFromHeist: -24 * 365 * 24,
    title: '24 Years Before The Heist',
    writers: ['Garrett Lerner']
  },
  {
    color: Color.Orange,
    defaultNumber: 5,
    hoursFromHeist: -3 * 7 * 24,
    title: '3 Weeks Before The Heist',
    writers: ['Kate Barnow']
  },
  {
    color: Color.Red,
    defaultNumber: 6,
    hoursFromHeist: 12,
    title: 'The Morning After The Heist',
    writers: ['Kalen Egan']
  },
  {
    color: Color.Pink,
    defaultNumber: 7,
    hoursFromHeist: 6 * 30 * 24,
    title: '6 Months After The Heist',
    writers: ['Ning Zhou']
  }
];

test('convertEpisodesToColors', () => {
  expect(convertEpisodesToColors(episodes)).toStrictEqual([
    Color.White, Color.Yellow, Color.Green, Color.Blue, Color.Violet, Color.Orange, Color.Red, Color.Pink, 
  ])
});

test('sanitizeEpisodesOrderCookie', () => {
  expect(sanitizeEpisodesOrderCookie(null)).toBeNull()
  expect(sanitizeEpisodesOrderCookie('')).toBeNull()
  expect(sanitizeEpisodesOrderCookie(0)).toBeNull()
  expect(sanitizeEpisodesOrderCookie('0')).toBeNull()
  expect(sanitizeEpisodesOrderCookie([])).toBeNull()
  expect(sanitizeEpisodesOrderCookie(undefined)).toBeNull()
  expect(sanitizeEpisodesOrderCookie({})).toBeNull()

  expect(sanitizeEpisodesOrderCookie([null])).toBeNull()
  expect(sanitizeEpisodesOrderCookie([''])).toBeNull()
  expect(sanitizeEpisodesOrderCookie([0])).toBeNull()
  expect(sanitizeEpisodesOrderCookie(['0'])).toBeNull()
  expect(sanitizeEpisodesOrderCookie([[]])).toBeNull()
  expect(sanitizeEpisodesOrderCookie([undefined])).toBeNull()
  expect(sanitizeEpisodesOrderCookie([{}])).toBeNull()

  expect(sanitizeEpisodesOrderCookie([
    'yellow', 'green', 'blue', 'violet', 'orange', 'red', 'pink'
  ])).toBeNull()

  expect(sanitizeEpisodesOrderCookie([
    0, 'yellow', 'green', 'blue', 'violet', 'orange', 'red', 'pink'
  ])).toBeNull()

  expect(sanitizeEpisodesOrderCookie([
    'someimaginarycolor', 'yellow', 'green', 'blue', 'violet', 'orange', 'red', 'pink'
  ])).toBeNull()

  expect(sanitizeEpisodesOrderCookie([
    'yellow', 'yellow', 'green', 'blue', 'violet', 'orange', 'red', 'pink'
  ])).toBeNull()

  expect(sanitizeEpisodesOrderCookie([
    'white', 'yellow', 'green', 'blue', 'violet', 'orange', 'red', 'pink'
  ])).toStrictEqual(episodes)
});

test('sanitizeEpisodesCountCookie', () => {
  expect( sanitizeEpisodesCountCookie(null)).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie('')).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie(0)).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie('0')).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie(undefined)).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie({})).toBe(EPISODE_COUNT)

   expect( sanitizeEpisodesCountCookie([null])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([''])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([0])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie(['0'])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([[]])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([undefined])).toBe(EPISODE_COUNT)
   expect( sanitizeEpisodesCountCookie([{}])).toBe(EPISODE_COUNT)

   expect( sanitizeEpisodesCountCookie(-1)).toBe(EPISODE_COUNT);
   expect( sanitizeEpisodesCountCookie(9)).toBe(EPISODE_COUNT);
   expect( sanitizeEpisodesCountCookie('-1')).toBe(EPISODE_COUNT);
   expect( sanitizeEpisodesCountCookie('9')).toBe(EPISODE_COUNT);

   expect( sanitizeEpisodesCountCookie(1)).toBe(1);
   expect( sanitizeEpisodesCountCookie(2)).toBe(2);
   expect( sanitizeEpisodesCountCookie(3)).toBe(3);
   expect( sanitizeEpisodesCountCookie(4)).toBe(4);
   expect( sanitizeEpisodesCountCookie(5)).toBe(5);
   expect( sanitizeEpisodesCountCookie(6)).toBe(6);
   expect( sanitizeEpisodesCountCookie(7)).toBe(7);
   expect( sanitizeEpisodesCountCookie(8)).toBe(8);

   expect( sanitizeEpisodesCountCookie('1')).toBe(1);
   expect( sanitizeEpisodesCountCookie('2')).toBe(2);
   expect( sanitizeEpisodesCountCookie('3')).toBe(3);
   expect( sanitizeEpisodesCountCookie('4')).toBe(4);
   expect( sanitizeEpisodesCountCookie('5')).toBe(5);
   expect( sanitizeEpisodesCountCookie('6')).toBe(6);
   expect( sanitizeEpisodesCountCookie('7')).toBe(7);
   expect( sanitizeEpisodesCountCookie('8')).toBe(8);
})