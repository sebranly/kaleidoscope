import { Color } from '../../types';
import { getDotEmoji, getNumberEmoji, getNumberWord, getSquareEmoji } from '../index';

test('getSquareEmoji', () => {
  expect(getSquareEmoji(Color.Yellow)).toBe('🟨');
  expect(getSquareEmoji(Color.Green)).toBe('🟩');
  expect(getSquareEmoji(Color.Blue)).toBe('🟦');
  expect(getSquareEmoji(Color.Violet)).toBe('🟪');
  expect(getSquareEmoji(Color.Orange)).toBe('🟧');
  expect(getSquareEmoji(Color.Red)).toBe('🟥');
  expect(getSquareEmoji(Color.Pink)).toBe('🟫');
  expect(getSquareEmoji(Color.White)).toBe('⬜');
});

test('getDotEmoji', () => {
  expect(getDotEmoji(Color.Yellow)).toBe('🟡');
  expect(getDotEmoji(Color.Green)).toBe('🟢');
  expect(getDotEmoji(Color.Blue)).toBe('🔵');
  expect(getDotEmoji(Color.Violet)).toBe('🟣');
  expect(getDotEmoji(Color.Orange)).toBe('🟠');
  expect(getDotEmoji(Color.Red)).toBe('🔴');
  expect(getDotEmoji(Color.Pink)).toBe('🟤');
  expect(getDotEmoji(Color.White)).toBe('⚪');
});

test('getNumberEmoji', () => {
  expect(getNumberEmoji(1)).toBe('1️⃣');
  expect(getNumberEmoji(2)).toBe('2️⃣');
  expect(getNumberEmoji(3)).toBe('3️⃣');
  expect(getNumberEmoji(4)).toBe('4️⃣');
  expect(getNumberEmoji(5)).toBe('5️⃣');
  expect(getNumberEmoji(6)).toBe('6️⃣');
  expect(getNumberEmoji(7)).toBe('7️⃣');
  expect(getNumberEmoji(8)).toBe('8️⃣');
  expect(getNumberEmoji(9)).toBe('#️⃣');
});

test('getNumberWord', () => {
  expect(getNumberWord(1)).toBe('one');
  expect(getNumberWord(2)).toBe('two');
  expect(getNumberWord(3)).toBe('three');
  expect(getNumberWord(4)).toBe('four');
  expect(getNumberWord(5)).toBe('five');
  expect(getNumberWord(6)).toBe('six');
  expect(getNumberWord(7)).toBe('seven');
  expect(getNumberWord(8)).toBe('eight');
  expect(getNumberWord(9)).toBe('unknown');
});
