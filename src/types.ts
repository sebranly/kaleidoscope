export enum Color {
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Orange = 'orange',
  Red = 'red',
  Pink = 'pink',
  White = 'white'
}

export type Episode = {
  color: Color;
  defaultNumber: number;
  director?: string;
  hoursFromHeist: number;
  title: string;
  writers: string[];
};
