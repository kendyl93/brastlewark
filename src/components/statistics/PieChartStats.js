import React, { Component } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import { hasEmptyArrays, countedDuplicates } from '../../arrays';
import { mapValues } from '../../objects';
import { renderCustomizedLabel, ChartBox } from './helpers';

const COLORS = ['#0088FE', '#00C49F'];

const responsiveAspect = 2;

class PieChartStats extends Component {
  render() {
    const { data, mobileView } = this.props;
    const friends = mapValues(({ friends }) => friends)(data);
    const countedFriends = hasEmptyArrays(friends);
    const test = countedDuplicates(countedFriends);
    const parsedData = Object.entries(test).map(x => ({
      hasFriends: x[0],
      gnomeNumber: x[1]
    }));

    return (
      <ChartBox>
        <ResponsiveContainer aspect={responsiveAspect} width="100%">
          <PieChart width={400} height={600} onMouseEnter={this.onPieEnter}>
            <Pie
              data={parsedData}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={mobileView ? 40 : 80}
              fill="#8884d8"
              dataKey={'gnomeNumber'}
            >
              <Legend formatter={() => 'Gnomes professions'} />
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
    );
  }
}

export default PieChartStats;
