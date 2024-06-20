import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RiskRewardGraph = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="price" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="profitLoss" stroke="#8884d8" />
    </LineChart>
  );
};

export default RiskRewardGraph;
