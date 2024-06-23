import React from "react";
import { OptionDetails } from "../../types/options";

interface TableProps {
  data: OptionDetails[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 border-b border-gray-200">Type</th>
            <th className="py-3 px-4 border-b border-gray-200">Strike Price</th>
            <th className="py-3 px-4 border-b border-gray-200">Long/Short</th>
            <th className="py-3 px-4 border-b border-gray-200">Max Profit</th>
            <th className="py-3 px-4 border-b border-gray-200">Max Loss</th>
            <th className="py-3 px-4 border-b border-gray-200">Breakeven</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.type}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.strikePrice}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.longShort}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.maxProfit}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.maxLoss}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-center">
                {row.breakeven}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
