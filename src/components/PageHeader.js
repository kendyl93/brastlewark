import React from 'react';
import styled from 'styled-components';
import { Menu as MenuIcon } from 'react-feather';

const HeaderBox = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  h1 {
    @media screen and (max-width: 800px) {
      margin-left: 8px;
    }

    margin-top: 0;
    margin-bottom: 8px;
  }

  .menu-icon-box {
    &:hover {
      cursor: pointer;
    }

    @media screen and (min-width: 800px) {
      display: none;
    }
  }
`;

const PageHeader = ({ customPageTitle = undefined, navigation, children }) => (
  <HeaderBox>
    <div className="menu-icon-box">
      <MenuIcon onClick={navigation} />
    </div>
    <h1>{customPageTitle ? customPageTitle : children}</h1>
  </HeaderBox>
);

export default PageHeader;
