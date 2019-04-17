import React from 'react';
import styled from 'styled-components';

const InfoMessageBox = styled.div`
  max-width: 800px;
  margin: 32px auto;
`;

const InfoMessage = ({ children }) => (
  <InfoMessageBox>
    <h3>{children ? children : 'Something went wrong'}</h3>
  </InfoMessageBox>
);

export default InfoMessage;
