import React, { useState } from "react";
import { UNDERLYING_PRICES } from "../constants";
import { AnalysisResult, OptionContract } from "../types/options";
import { calculateProfitLoss } from "../utils/calculations";
import Chart from "./components/Chart";
import Layout from "./components/Layout";
import OptionsForm from "./components/OptionsForm";
import Table from "./components/Table";

const App: React.FC = () => {
  const [data, setData] = useState<AnalysisResult[][]>([]);
  const [contracts, setContracts] = useState<OptionContract[]>([]);

  const handleCalculate = (newContracts: OptionContract[]) => {
    setContracts(newContracts); // Update contracts state
    const result = calculateProfitLoss(newContracts, UNDERLYING_PRICES);
    setData(result);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Options Strategy Risk & Reward Analysis
      </h1>
      <OptionsForm contracts={contracts} onCalculate={handleCalculate} />
      {data.length > 0 && (
        <>
          <Chart data={data} />
          {data.map((dataset, index) => (
            <Table key={index} data={dataset} />
          ))}
        </>
      )}
    </Layout>
  );
};

export default App;
