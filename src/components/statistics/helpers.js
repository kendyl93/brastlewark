import React from 'react';
import { RADIAN } from '../../Math';
import styled from 'styled-components';

export const ChartBox = styled.div`
  margin: 32px auto;
  flex-grow: 1;
`;

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  hasFriends
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentNumber = (percent * 100).toFixed(0);
  const labelText =
    hasFriends.toLowerCase() === 'true'
      ? `${percentNumber}% Gnomes have friends`
      : `${percentNumber}% Gnomes have no friends`;

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {labelText}
    </text>
  );
};
