import React, { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Brush,
} from "recharts";

const contracts = [
  { type: "call", strike: 460, premium: 17.5, quantity: 1 },
  { type: "put", strike: 480, premium: 15.0, quantity: 2 },
  { type: "call", strike: 440, premium: 20.0, quantity: 1 },
  { type: "put", strike: 450, premium: 18.0, quantity: 1 },
];

const colors = ["#1e90ff", "#ff8c00", "#8a2be2", "#ffe100"];

const OptionsStrategyGraph = () => {
  const [visibleBreakEven, setVisibleBreakEven] = useState(null);

  const calculatePnL = (underlyingPrice, contract) => {
    const { type, strike, premium, quantity } = contract;
    let pnl = 0;
    if (type === "call") {
      pnl = Math.max(0, underlyingPrice - strike) - premium;
    } else if (type === "put") {
      pnl = Math.max(0, strike - underlyingPrice) - premium;
    }
    return pnl * quantity;
  };

  const findBreakEvenPoints = () => {
    const breakEvenPoints = contracts.map((contract) => {
      const { type, strike, premium } = contract;
      return type === "call" ? strike + premium : strike - premium;
    });
    return breakEvenPoints;
  };

  const breakEvenPoints = findBreakEvenPoints();

  const startPrice = Math.min(...breakEvenPoints) - 50;
  const endPrice = Math.max(...breakEvenPoints) + 50;

  const data = Array.from({ length: endPrice - startPrice + 1 }, (_, i) => {
    const underlyingPrice = startPrice + i;
    const contractPnL = contracts.map((contract) =>
      calculatePnL(underlyingPrice, contract)
    );
    return {
      underlyingPrice,
      contract1: contractPnL[0],
      contract2: contractPnL[1],
      contract3: contractPnL[2],
      contract4: contractPnL[3],
    };
  });

  const calculateMaxProfit = () => {
    const maxProfits = contracts.map((contract) => {
      const { type, premium, quantity } = contract;
      if (type === "call") {
        return (endPrice - premium) * quantity;
      } else if (type === "put") {
        return premium * quantity;
      }
      return 0;
    });
    return maxProfits.reduce((acc, val) => acc + val, 0);
  };

  const calculateMaxLoss = () => {
    const maxLosses = contracts.map((contract) => {
      const { type, strike, premium, quantity } = contract;
      if (type === "call") {
        return -premium * quantity;
      } else if (type === "put") {
        return (strike - startPrice) * quantity;
      }
      return 0;
    });
    return maxLosses.reduce((acc, val) => acc + val, 0);
  };

  const maxProfit = calculateMaxProfit();
  const maxLoss = calculateMaxLoss();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`Underlying Price: ${label}`}</p>
          {payload.map((entry, index) => {
            const isProfit = entry.value > 0;
            return (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {`${contracts[index].type.toUpperCase()} ${
                  contracts[index].strike
                } Strike: $${entry.value.toFixed(2)}`}
                <span
                  style={{
                    color: isProfit ? "green" : "red",
                    marginLeft: "10px",
                  }}
                >
                  {isProfit ? "↑" : "↓"} ${entry.value.toFixed(2)}
                </span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h1>Options Strategy Graph</h1>
      <div>
        <p>Max Profit: ${maxProfit.toFixed(2)}</p>
        <p>Max Loss: ${maxLoss.toFixed(2)}</p>
      </div>
      {contracts.length > 0 && (
        <table
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Type
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Strike Price
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Premium
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index} style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {contract.type}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {contract.strike}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {contract.premium}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {contract.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        {contracts.map((_, index) => (
          <button
            key={index}
            onClick={() => setVisibleBreakEven(index)}
            style={{
              backgroundColor: colors[index % colors.length],
              color: "white",
              margin: "5px",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Show Break Even for Contract {index + 1}
          </button>
        ))}
      </div>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid stroke="#dcdcdc" strokeDasharray="3 3" />
          <XAxis
            dataKey="underlyingPrice"
            type="number"
            domain={[startPrice, endPrice]}
            label={{
              value: "Underlying Price at Expiry",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{
              value: "Profit/Loss",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Brush
            dataKey="underlyingPrice"
            height={30}
            stroke="#8884d8"
            startIndex={0}
          />
          {visibleBreakEven !== null && (
            <ReferenceLine
              x={breakEvenPoints[visibleBreakEven]}
              stroke={colors[visibleBreakEven % colors.length]}
              strokeDasharray="5 5"
              label={{
                position: "insideTopLeft",
                value: `Break Even: ${breakEvenPoints[visibleBreakEven].toFixed(
                  2
                )}`,
              }}
            />
          )}
          {contracts.map((_, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={`contract${index + 1}`}
              stroke={colors[index % colors.length]}
              dot={false}
              name={`Contract ${index + 1}`}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OptionsStrategyGraph;
