import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Users as UsersIcon,
  PieChart as PieChartIcon,
  Heart as HeartIcon,
  X as CloseIcon
} from 'react-feather';

const NavigationBox = styled.div`
  position: fixed;
  height: 100%;
  -webkit-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  background: #fff;
  top: 0;
  left: 0;
  width: 280px;
  z-index: 10;

  @media screen and (min-width: 800px) {
    position: relative;
    width: 300px;
  }
`;

const NavigationInner = styled.nav`
  position: fixed;
  padding: 32px;
  width: 236px;
  }
`;

const NavigationList = styled.ul`
  margin: 64px 0;
`;

const NavigationElement = styled.span`
  margin-left: 8px;
`;

const AppNameBox = styled.div`
  display: flex;
  align-items: center;

  .close-icon-box {
    &:hover {
      cursor: pointer;
    }

    @media screen and (min-width: 800px) {
      display: none;
    }
  }
`;

const Navigation = ({ onClose, mobileView }) => (
  <NavigationBox>
    <NavigationInner>
      <AppNameBox className="row-margin">
        <div className="close-icon-box">
          <CloseIcon onClick={mobileView && onClose} />
        </div>
        <h1>Brastlewark</h1>
      </AppNameBox>
      <NavigationList>
        <li>
          <Link to="/brastlewark" onClick={mobileView && onClose}>
            <UsersIcon />
            <NavigationElement>Citizens</NavigationElement>
          </Link>
        </li>
        <li>
          <Link to="/brastlewark/statistics" onClick={mobileView && onClose}>
            <PieChartIcon />
            <NavigationElement>Statistics</NavigationElement>
          </Link>
        </li>
        <li>
          <Link to="/brastlewark/favourites" onClick={mobileView && onClose}>
            <HeartIcon />
            <NavigationElement>favourites</NavigationElement>
          </Link>
        </li>
      </NavigationList>
    </NavigationInner>
  </NavigationBox>
);

export default Navigation;
