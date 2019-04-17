import React from 'react';
import Heroes from './gnomes/Heroes';

const customPageHeader = 'Favourites';

const Favourites = ({
  data,
  removeFavourite,
  onToggleNavigation,
  list,
  mobileView
}) => {
  return (
    <div>
      <Heroes
        data={data}
        onToggleNavigation={onToggleNavigation}
        removeFavourite={removeFavourite}
        list={list}
        mobileView={mobileView}
        customPageTitle={customPageHeader}
      />
    </div>
  );
};

export default Favourites;
