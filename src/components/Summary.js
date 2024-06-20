import React from 'react';

const Summary = ({ data }) => {
  const profits = data.map(d => d.profitLoss);
  const maxProfit = Math.max(...profits);
  const maxLoss = Math.min(...profits);
  const breakEvenPoints = data.filter(d => d.profitLoss === 0).map(d => d.price);

  return (
    <div>
      <h3>Summary</h3>
      <p>Max Profit: {maxProfit}</p>
      <p>Max Loss: {maxLoss}</p>
      <p>Break Even Points: {breakEvenPoints.join(', ')}</p>
    </div>
  );
};

export default Summary;
