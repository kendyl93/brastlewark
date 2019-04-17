import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { countedDuplicates } from '../../arrays';
import { mapValues } from '../../objects';
import { ChartBox } from './helpers';

const responsiveAspect = 2;

class PieChartStats extends Component {
  render() {
    const { data } = this.props;
    const professions = mapValues(({ professions }) => professions)(
      data
    ).flatMap(x => x);
    const countedAge = countedDuplicates(professions);
    const parsedData = Object.entries(countedAge).map(x => ({
      profession: x[0],
      number: x[1]
    }));

    return (
      <ChartBox>
        <ResponsiveContainer aspect={responsiveAspect} width="100%">
          <BarChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="profession" type="category" />
            <YAxis />
            <Tooltip formatter={value => [value, 'Gnomes']} />
            <Legend formatter={() => 'Gnomes professions'} />
            <Bar dataKey="number" fill="#02569A" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
    );
  }
}

export default PieChartStats;
