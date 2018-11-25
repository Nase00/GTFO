import {
  STATUS_COLORS,
  SQUATTED,
  ABANDONED,
  VACANT,
  FIVE_MINUTE_WARNING,
  ONE_MINUTE_WARNING,
  BOOKED,
  OFFLINE,
  PINGED,
  DEFAULT,
  RED_GREEN,
  BLUE_YELLOW,
  MONOCHROME
} from 'constants';

export const STATUS_COLOR_THEMES = {
  [DEFAULT]: STATUS_COLORS,

  [RED_GREEN]: {
    [SQUATTED]: '#7F7F19',
    [ABANDONED]: '#80BFFF',
    [VACANT]: '#E5E52d',
    [FIVE_MINUTE_WARNING]: '#194C7F',
    [ONE_MINUTE_WARNING]: '#0F2D4C',
    [BOOKED]: '#47a3ff',
    [OFFLINE]: STATUS_COLORS.OFFLINE,
    [PINGED]: '#FF0000',
    [undefined]: STATUS_COLORS.OFFLINE
  },

  [BLUE_YELLOW]: {
    [SQUATTED]: '#8E1C55',
    [ABANDONED]: '#B1F9FF',
    [VACANT]: '#ff5BAD',
    [FIVE_MINUTE_WARNING]: '#1D484C',
    [ONE_MINUTE_WARNING]: '#143235',
    [BOOKED]: '#63F3FF',
    [OFFLINE]: '#FFFFFF',
    [PINGED]: '#FF0000',
    [undefined]: STATUS_COLORS.OFFLINE
  },

  [MONOCHROME]: {
    [SQUATTED]: '#D3D3D3',
    [ABANDONED]: '#2B2B2B',
    [VACANT]: '#D3D3D3',
    [FIVE_MINUTE_WARNING]: '#575757',
    [ONE_MINUTE_WARNING]: '#7B7B7B',
    [BOOKED]: '#2B2B2B',
    [OFFLINE]: '#000000',
    [PINGED]: '#FF0000',
    [undefined]: STATUS_COLORS.OFFLINE
  }
};