import React, { useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
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
    <ThemeProvider>
      <Layout>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Options Strategy Risk & Reward Analysis
        </h1>
        <OptionsForm contracts={contracts} onCalculate={handleCalculate} />
        {contracts.length === 0 && (
          <p className="text-center text-xl mt-10 text-gray-800 dark:text-gray-200">
            No options contracts added. Please add contracts to see the
            analysis.
          </p>
        )}
        {data.length > 0 && (
          <>
            <Chart data={data} />
            <div className="mt-8">
              <Table data={details} />
            </div>
          </>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
