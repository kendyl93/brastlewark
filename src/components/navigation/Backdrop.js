import React from 'react';
import styled from 'styled-components';

const BackdropDark = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 1;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const Backdrop = props => <BackdropDark onClick={props.clicked} />;

export default Backdrop;
