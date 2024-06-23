import React, { useState } from "react";
import { UNDERLYING_PRICES } from "../constants";
import {
  AnalysisResult,
  OptionContract,
  OptionDetails,
} from "../types/options";
import { calculateProfitLoss } from "../utils/calculations";
import Chart from "./components/Chart";
import Layout from "./components/Layout";
import OptionsForm from "./components/OptionsForm";
import Table from "./components/Table";

const App: React.FC = () => {
  const [data, setData] = useState<AnalysisResult[][]>([]);
  const [details, setDetails] = useState<OptionDetails[]>([]);
  const [contracts, setContracts] = useState<OptionContract[]>([]);

  const handleCalculate = (newContracts: OptionContract[]) => {
    setContracts(newContracts); // Update contracts state
    const { results, details } = calculateProfitLoss(
      newContracts,
      UNDERLYING_PRICES
    );
    setData(results);
    setDetails(details);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Options Strategy Risk & Reward Analysis
      </h1>
      <OptionsForm contracts={contracts} onCalculate={handleCalculate} />
      {data.length > 0 && (
        <>
          <Chart data={data} />
          <div className="mt-8">
            <Table data={details} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default App;
