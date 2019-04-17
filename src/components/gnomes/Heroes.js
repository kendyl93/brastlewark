import React, { Component } from 'react';
import { List, AutoSizer, CellMeasurerCache } from 'react-virtualized';
import styled from 'styled-components';
import '../../App.scss';
import InfoMessage from '../InfoMessage';
import Heroe from './Heroe';

import PageHeader from '../PageHeader';

const InputBox = styled.div`
  max-width: 800px;
  margin: 16px auto;
`;

class Heroes extends Component {
  constructor(props) {
    super(props);

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 300
    });

    this.state = { value: '', filteredList: [] };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ filteredList: data });
  }

  handleInputChange = event => {
    const { value } = event.target;
    const { data } = this.props;

    const filtered = data.filter(gnome => {
      if (gnome.name.toLowerCase().includes(value)) {
        return gnome;
      }
    });

    this.setState({ value, filteredList: filtered });
  };

  render() {
    const { rowHeight } = this.cache;
    const { value, filteredList } = this.state;
    const {
      id = undefined,
      onToggleNavigation,
      favouritesClick,
      removeFavourite,
      list,
      mobileView,
      customPageTitle
    } = this.props;
    const validData =
      filteredList.length !== 0 && filteredList !== undefined
        ? filteredList
        : undefined;

    return (
      <div>
        {!id && (
          <PageHeader
            customPageTitle={customPageTitle}
            navigation={onToggleNavigation}
          >
            Citizens
          </PageHeader>
        )}
        <InputBox>
          <input
            type="text"
            onChange={event => this.handleInputChange(event)}
            value={value}
            className="input"
            placeholder="Search for Gnomes..."
          />
        </InputBox>

        <div className="list">
          {validData ? (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={rowHeight}
                  rowRenderer={
                    validData &&
                    Heroe(
                      validData,
                      this.cache,
                      favouritesClick,
                      removeFavourite,
                      list,
                      mobileView
                    )
                  }
                  rowCount={validData.length}
                  overscanRowCount={3}
                />
              )}
            </AutoSizer>
          ) : (
            <InfoMessage>
              {`Seems that ${value} have not arrived to the town yet.`}
            </InfoMessage>
          )}
        </div>
      </div>
    );
  }
}

export default Heroes;
