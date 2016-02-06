import { colors, breakpoints } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

export const styles = {
  svgStroke: '#BBBBBB',

  OFFLINE: GREY,

  BOOKED: BLUE,

  VACANT: GREEN,

  ONE_MINUTE_WARNING: RED,

  FIVE_MINUTE_WARNING: ORANGE
};

export const rules = {
  officeLayout: {
    'img.office-layout, svg.office-layout': {
      position: 'absolute',
      top: '65px',
      left: '-200px',
      height: '1000px',
      width: '1000px'
    },

    mediaQueries: {
      [breakpoints.afterMedium]: {
        'img.office-layout, svg.office-layout': {
          left: '-200px',
          height: '1200px',
          width: '1200px'
        }
      },

      [breakpoints.afterLarge]: {
        'img.office-layout, svg.office-layout': {
          left: '150px',
          height: '1600px',
          width: '1600px'
        }
      },

      [breakpoints.afterExtraLarge]: {
        'img.office-layout, svg.office-layout': {
          left: '300px',
          height: '1800px',
          width: '1800px'
        }
      }
    }
  },

  roomText: {
    'text.room-text': {
      zIndex: '200',
      fontSize: '10px',
      fontFamily: `'Wire One', sans-serif`
    },

    mediaQueries: {
      [breakpoints.beforeMedium]: {
        'text.room-text': {
          transform: 'translateY(-10px)'
        }
      },

      [breakpoints.afterMedium]: {
        'text.room-text': {
          fontSize: '11px'
        }
      },

      [breakpoints.afterLarge]: {
        'text.room-text': {
          fontSize: '16px',
          fontWeight: '18'
        }
      }
    }
  }
};
