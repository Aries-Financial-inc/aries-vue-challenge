import React, { useState } from "react";
import Chart from "./components/Chart";
import Table from "./components/Table";
import OptionsForm from "./components/OptionsForm";
import Layout from "./components/Layout";
import { UNDERLYING_PRICES } from "../constants/index";
import { AnalysisResult, OptionContract } from "../types/options";
import { calculateProfitLoss } from "../utils/calculations";

const App: React.FC = () => {
  const [data, setData] = useState<AnalysisResult[]>([]);

  const handleCalculate = (contracts: OptionContract[]) => {
    const result = calculateProfitLoss(contracts, UNDERLYING_PRICES);
    setData(result);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Options Strategy Risk & Reward Analysis
      </h1>
      <OptionsForm onCalculate={handleCalculate} />
      {data.length > 0 && (
        <>
          <Chart data={data} />
          <Table data={data} />
        </>
      )}
    </Layout>
  );
};

export default App;
