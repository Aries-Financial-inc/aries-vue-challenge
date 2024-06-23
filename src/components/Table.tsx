import React from "react";
import { AnalysisResult } from "../../types/options";

interface TableProps {
  data: AnalysisResult[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr>
          <th>Price at Expiry</th>
          <th>Profit/Loss</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{row.priceAtExpiry}</td>
            <td className="border px-4 py-2">{row.profitLoss}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
