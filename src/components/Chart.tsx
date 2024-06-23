import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AnalysisResult } from "../../types/options";

interface ChartProps {
  data: AnalysisResult[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="priceAtExpiry"
            label={{
              value: "Price at Expiry",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: "Profit/Loss", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="profitLoss" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
