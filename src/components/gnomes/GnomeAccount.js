import React, { Component } from 'react';
import '../../App.scss';
import styled from 'styled-components';
import Heroes from './Heroes';
import { roundValue } from '../../Math';

const ImageBox = styled.div`
  display: flex;
  justify-content: center;

  img {
    border: solid 8px ${({ color }) => (color ? color : 'transparent')};
    borderradius: 50%;
    padding: 0;
  }
`;

const Features = styled.div`
  @media screen and (min-width: 426px) {
    display: flex;
    justify-content: center;
  }
`;

const Feature = styled.div`
  max-width: 100%;
  flex-basis: auto;
  background: #fff;
  border-radius: 12px;
  padding: 16px 0;
  align-items: center;
  flex-direction: column;
  display: flex;
  flex-grow: 1;
  margin: 8px;
  -webkit-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);

  @media screen and (min-width: 426px) {
    max-width: 200px;
    margin: 0 4px;
  }

  .feature-value {
    font-size: 48px;
    font-weight: 600;
  }
`;

const ProfessionsList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ProfessionsBox = styled.div`
  h3 {
    margin-bottom: 16px;
  }
`;

const Profession = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 8px 16px;
  -webkit-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 41px -22px rgba(0, 0, 0, 0.75);
  margin: 4px 8px;

  @media screen and (max-width: 426px) {
    flex-grow: 1;
    text-align: center;
  }
`;

class GnomeAccount extends Component {
  filterFriends = friendsNames => data =>
    friendsNames.map(friendName =>
      data.find(gnome => {
        const gnomeName = gnome.name.toLowerCase();
        const gnomeFriendName = friendName.toLowerCase();

        if (gnomeName === gnomeFriendName) {
          return gnome;
        }
      })
    );

  render() {
    const data = this.props && this.props.data;
    const { removeFavourite, favouritesClick, mobileView, list } = this.props;
    const { id } = this.props.match.params;
    const currentGnomeId = parseInt(id, 10);
    const currentGnome = data.find(gnome => gnome.id === currentGnomeId);
    const {
      age,
      friends,
      hair_color,
      height,
      name,
      professions,
      thumbnail,
      weight
    } = currentGnome;
    const gnomeFriends = this.filterFriends(friends)(data);
    const maybeFriendly = friends.length > 0 && friends !== undefined;
    const mayHasProfessions =
      professions.length > 0 && professions !== undefined;

    const gnomeProfessions = professions.map(profession => (
      <Profession key={profession}>{profession}</Profession>
    ));

    return (
      <div className="column-margin">
        <ImageBox color={hair_color}>
          <img src={thumbnail} alt={name} height={250} width={250} />
        </ImageBox>
        <div className="mobile-text-center">
          <h1>{name}</h1>
        </div>
        <Features>
          <Feature>
            <div className="feature-value">{age}</div>
            <div>Years</div>
          </Feature>
          <Feature>
            <div className="feature-value">{hair_color}</div>
            <div>Hair color</div>
          </Feature>
          <Feature>
            <div className="feature-value">{roundValue(height)}</div>
            <div>Height</div>
          </Feature>
          <Feature>
            <div className="feature-value">{roundValue(weight)}</div>
            <div>weight</div>
          </Feature>
        </Features>
        {mayHasProfessions && (
          <ProfessionsBox>
            <h3>{name} professions</h3>
            <ProfessionsList className="row-margin">
              {professions && gnomeProfessions}
            </ProfessionsList>
          </ProfessionsBox>
        )}
        {maybeFriendly && (
          <div className="mobile-text-center">
            <h3>{name} friends</h3>
            <Heroes
              id={id}
              data={gnomeFriends}
              removeFavourite={removeFavourite}
              favouritesClick={favouritesClick}
              list={list}
              mobileView={mobileView}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GnomeAccount;
