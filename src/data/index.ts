import { Color, Episode } from '../types';

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
  },
  {
    color: Color.White,
    defaultNumber: 8,
    director: russell,
    hoursFromHeist: 0,
    title: 'The Heist (Finale)',
    writers: [eric]
  }
];

export { episodes };
