import React from 'react';
import { CellMeasurer } from 'react-virtualized';
import { Link } from 'react-router-dom';
import {
  Heart as HeartIcon,
  Trash2 as TrashIcon,
  Briefcase as BriefcaseIcon,
  Smile as SmileIcon,
  GitHub as CalmIcon,
  Zap as DangerIcon
} from 'react-feather';
import styled from 'styled-components';
import Spinner from '../../Spinner';

const HeroeLinkBox = styled.div`
  display: flex;

  ${({ mobileView }) => (mobileView ? 'min-height: 280px' : 'min-height: auto')}

  a {
    flex-grow: 1;

    div {
      @media screen and (max-width: 426px) {
        margin-bottom: 8px;
      }
    }
  }
`;

const FavouriteButtonBox = styled.div`
  @media screen and (max-width: 426px) {
    justify-content: flex-end;
    display: flex;
  }
`;

const IconsBadges = styled.div`
  display: flex;
  margin-top: 8px;

  @media screen and (max-width: 426px) {
    justify-content: center;
  }
`;

const ExtraInfoBox = styled.div`
  @media screen and (max-width: 426px) {
    display: flex;
  }
`;

const ExtraInfoMobile = styled.div`
  display: none;

  @media screen and (max-width: 426px) {
    display: flex;
    flex-grow: 1;
    justify-centent: flex-start;
  }
`;

const IconBox = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;

  &.danger {
    polygon {
      stroke: red;
    }
  }
`;

const BehaviorIconBox = styled.div`
  @media screen and (max-width: 426px) {
    display: none;
  }
`;

const renderHeroe = (
  data,
  favouriteGnome,
  mobileView,
  favouritesClick,
  removeFavourite,
  index
) => {
  const {
    name,
    thumbnail,
    age,
    id,
    professions = [],
    friends = [],
    weight
  } = data[index];
  const maybeUnfriendly = friends === undefined || friends.length === 0;
  const maybeUnbusy = professions.length === 0 || professions === undefined;
  const maybeDanger = weight >= 40;

  return (
    <HeroeLinkBox
      mobileView={mobileView}
      className="row-inner mobile-text-center"
    >
      <Link to={`/gnome/${id}`} className="row-margin">
        <div>
          {thumbnail ? (
            <img src={thumbnail} alt={name} height="100px" width="100px" />
          ) : (
            <Spinner small={true} />
          )}
        </div>
        <div className="content">
          <h3>{name}</h3>
          <div>age: {age}</div>
          <IconsBadges className="row-margin">
            {!maybeUnfriendly && (
              <div title="Friendly">
                <SmileIcon />
              </div>
            )}
            {!maybeUnbusy && (
              <div title="Has professions">
                <BriefcaseIcon />
              </div>
            )}
            {maybeDanger ? (
              <BehaviorIconBox title="Dangerous">
                <DangerIcon />
              </BehaviorIconBox>
            ) : (
              <BehaviorIconBox title="Calm">
                <CalmIcon />
              </BehaviorIconBox>
            )}
          </IconsBadges>
        </div>
      </Link>
      <div>
        <ExtraInfoBox>
          <ExtraInfoMobile>
            {maybeDanger ? (
              <IconBox className="danger">
                <DangerIcon />
              </IconBox>
            ) : (
              <IconBox>
                <CalmIcon />
              </IconBox>
            )}
          </ExtraInfoMobile>
          {!favouriteGnome ? (
            <FavouriteButtonBox>
              <button
                className="favourite-button normal"
                onClick={() => favouritesClick(id)}
              >
                <HeartIcon />
              </button>
            </FavouriteButtonBox>
          ) : (
            <FavouriteButtonBox>
              <button
                className="favourite-button danger"
                onClick={() => removeFavourite(id)}
              >
                <TrashIcon />
              </button>
            </FavouriteButtonBox>
          )}
        </ExtraInfoBox>
      </div>
    </HeroeLinkBox>
  );
};

const Heroe = (
  data,
  cache,
  favouritesClick,
  removeFavourite,
  list,
  mobileView
) => ({ index, style, parent }) => {
  const { id } = data[index];
  const favouriteGnome = list && list.includes(id);

  return (
    <CellMeasurer
      key={id}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      <div style={style} className="row">
        {data ? (
          renderHeroe(
            data,
            favouriteGnome,
            mobileView,
            favouritesClick,
            removeFavourite,
            index
          )
        ) : (
          <Spinner />
        )}
      </div>
    </CellMeasurer>
  );
};

export default Heroe;
