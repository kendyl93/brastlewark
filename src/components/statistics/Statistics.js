import React from 'react';
import BarChartStats from './BarChartStats';
import PieChartStats from './PieChartStats';
import PageHeader from '../PageHeader';

const Statistics = ({ data, onToggleNavigation, mobileView }) => {
  return (
    <div>
      <PageHeader navigation={onToggleNavigation}>Statistics</PageHeader>
      <BarChartStats data={data} />
      <PieChartStats mobileView={mobileView} data={data} />
    </div>
  );
};

export default Statistics;
