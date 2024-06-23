import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { AnalysisResult, CombinedAnalysisResult } from "../../types/options";

interface ChartProps {
  data: AnalysisResult[][];
}

const colors = ["#3b82f6", "#8b5cf6", "#ffc658", "#ff7300"]; // Define more colors if needed

const Chart: React.FC<ChartProps> = ({ data }) => {
  const combinedData: CombinedAnalysisResult[] = data[0].map((_, index) => {
    const point: CombinedAnalysisResult = {
      priceAtExpiry: data[0][index].priceAtExpiry,
    };
    data.forEach((dataset, i) => {
      point[`profitLoss${i + 1}`] = dataset[index].profitLoss;
    });
    return point;
  });

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={combinedData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceAtExpiry">
            <Label
              value="Price at Expiry"
              offset={-50}
              position="insideBottom"
              fill="#8884d8"
              style={{ fontSize: "18px", padding: "10px" }}
            />
          </XAxis>
          <YAxis>
            <Label
              value="Profit/Loss"
              angle={-90}
              position="insideLeft"
              fill="#8884d8"
              style={{
                textAnchor: "middle",
                fontSize: "18px",
                padding: "10px",
              }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          {data.map((_, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={`profitLoss${index + 1}`}
              stroke={colors[index % colors.length]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
