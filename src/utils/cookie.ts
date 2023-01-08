import { EPISODE_COUNT } from '../constants/general';
import { Color, Episode } from '../types';
import { episodes } from '../data/index';
import { getEpisodeByColor } from '.';

const convertEpisodesToColors = (episodes: Episode[]) => {
  return episodes.map((episode: Episode) => episode.color);
};

const sanitizeEpisodesOrderCookie = (cookieValue: any) => {
  if (!cookieValue) return null;
  if (!Array.isArray(cookieValue)) return null;
  if (cookieValue.length !== EPISODE_COUNT) return null;

  const hasANonString = cookieValue.some((value: any) => typeof value !== 'string');

  if (hasANonString) return null;

  const allColors = episodes.map((episode: Episode) => episode.color);
  const hasANonColor = cookieValue.some((value: any) => !allColors.includes(value));

  if (hasANonColor) return null;

  const hasAnAbsentColor = allColors.some((color: Color) => !cookieValue.includes(color));

  if (hasAnAbsentColor) return null;

  const episodesList = cookieValue.map((cookieColor: any) => {
    return getEpisodeByColor(episodes, cookieColor);
  });

  const hasNullValue = episodesList.some((episode: Episode | null) => episode === null);

  if (hasNullValue) return null;

  return episodesList as Episode[];
};

const sanitizeEpisodesCountCookie = (cookieValue: any) => {
  if (!cookieValue) return EPISODE_COUNT;
  if (!['number', 'string'].includes(typeof cookieValue)) return EPISODE_COUNT;

  const cookieNumberValue = Number(cookieValue);

  if (isNaN(cookieNumberValue)) return EPISODE_COUNT;
  if (cookieNumberValue < 1 || cookieNumberValue > EPISODE_COUNT) return EPISODE_COUNT;

  return cookieNumberValue;
};

export { convertEpisodesToColors, sanitizeEpisodesCountCookie, sanitizeEpisodesOrderCookie };
