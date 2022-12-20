import { Color, Episode } from '../types';

const eric = 'Eric Garcia';
const evan = 'Evan Endicott';
const garrett = 'Garrett Lerner';
const jose = 'José Padilha';
const josh = 'Josh Stoddard';
const kalen = 'Kalen Egan';
const kate = 'Kate Barnow';
const ning = 'Ning Zhou';

const episodes: Episode[] = [
  {
    color: Color.Yellow,
    defaultNumber: 1,
    director: jose,
    hoursFromHeist: -6 * 7 * 24,
    title: '6 Weeks Before The Heist',
    writers: [eric]
  },
  {
    color: Color.Green,
    defaultNumber: 2,
    director: jose,
    hoursFromHeist: -7 * 365 * 24,
    title: '7 Years Before The Heist',
    writers: [eric]
  },
  {
    color: Color.Blue,
    defaultNumber: 3,
    director: 'TBA',
    hoursFromHeist: -5 * 24,
    title: '5 Days Before The Heist',
    writers: [eric]
  },
  {
    color: Color.Violet,
    defaultNumber: 4,
    director: 'TBA',
    hoursFromHeist: -24 * 365 * 24,
    title: '24 Years Before The Heist',
    writers: [garrett]
  },
  {
    color: Color.Orange,
    defaultNumber: 5,
    director: 'TBA',
    hoursFromHeist: -3 * 7 * 24,
    title: '3 Weeks Before The Heist',
    writers: [kate]
  },
  {
    color: Color.Red,
    defaultNumber: 6,
    director: 'TBA',
    hoursFromHeist: 12,
    title: 'The Morning After The Heist',
    writers: [kalen]
  },
  {
    color: Color.Pink,
    defaultNumber: 7,
    director: 'TBA',
    hoursFromHeist: 6 * 30 * 24,
    title: '6 Months After',
    writers: [ning]
  },
  {
    color: Color.White,
    defaultNumber: 8,
    director: 'TBA',
    hoursFromHeist: 0,
    title: 'The Heist (Finale)',
    writers: [evan, josh]
  }
];

export { episodes };
