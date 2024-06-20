import React, { useState } from 'react';
import OptionsForm from './components/OptionsForm';
import RiskRewardGraph from './components/RiskRewardGraph';
import Summary from './components/Summary';
import { calculatePnL } from './utils/utils';
import './App.css';

const App = () => {
  const [options, setOptions] = useState([]);
  const [pnlData, setPnlData] = useState([]);

  const handleAddOption = (option) => {
    const newOptions = [...options, option];
    setOptions(newOptions);

    const priceRange = Array.from({ length: 100 }, (_, i) => i * 5); // Example range from 0 to 500
    const pnl = calculatePnL(newOptions, priceRange);
    setPnlData(pnl);
  };

  return (
    <div>
      <h1>Options Strategy Analyzer</h1>
      <OptionsForm onAddOption={handleAddOption} />
      <RiskRewardGraph data={pnlData} />
      <Summary data={pnlData} />
    </div>
  );
};

export default App;
