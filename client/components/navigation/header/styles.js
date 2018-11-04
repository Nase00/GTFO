import { css } from 'emotion';

import { colors, fonts, MOBILE_WIDTH_BREAKPOINT } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    > div {
      padding: 0;
      justify-content: initial;
      background-color: ${colors.primary};
      height: 30px;
      min-height: 48px !important;
      overflow: hidden;
    }
  `,

  title: css`
    margin: 0 20px 0 0;
    padding: 6px 10px 0 10px;
    height: 100%;
    color: ${colors.WHITE};
    background-color: ${colors.BLACK};
    font-size: 35px;
    font-family: ${fonts.primary};
    font-weight: 8;

    @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}px) {
      min-width: 100px;
      font-size: 30px;
      font-weight: 600;
    }
  `,

  tab: css`
    font-size: 16px;
    min-width: 200px;
    background-color: ${colors.primary};
    span {
      color: ${colors.BLACK};
      font-size: 18px;
    }
    ,pointer: cursor;
  `
});

export default stylesGenerator;