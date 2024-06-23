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
import { ThemeProvider } from "./context/ThemeContext";

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
    </ThemeProvider>
  );
};

export default App;
