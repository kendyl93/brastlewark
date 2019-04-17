import React from 'react';
import styled from 'styled-components';

const SpinnerBox = styled.div`
  ${({ small }) =>
    !small &&
    `height: -webkit-fill-available;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  `}
`;

const SpinnerInner = styled.div`
  ${({ small }) =>
    !small &&
    `display: flex;
flex-direction: column;
justify-items: center;
align-items: center;`}
`;

const Spinner = ({ children, small = false }) => (
  <SpinnerBox small={small}>
    <SpinnerInner small={small}>
      <img
        heigh="50"
        width="50"
        src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif"
        alt="Spinner"
      />
      {children}
    </SpinnerInner>
  </SpinnerBox>
);

export default Spinner;
