import React from 'react';
import error from './error.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorPageBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

  p {
    font-size: 24px;
  }

  a {
    color: #19a4ea;
  }

  div {
    text-align: center;
  }

  img {
    @media screen and (max-width: 426px) {
      height: 200px !important;
    }
  }
`;

const ErrorPage = () => (
  <ErrorPageBox>
    <div>
      <img id="error-gnome" src={error} height={400} alt="Error Gnome" />
      <p>
        What are you looking for here ? Let's back to{' '}
        <Link to="/">
          <strong>citizens...</strong>
        </Link>
      </p>
    </div>
  </ErrorPageBox>
);

export default ErrorPage;
