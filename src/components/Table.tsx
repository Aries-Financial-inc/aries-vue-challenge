import React from "react";
import { OptionDetails } from "../../types/options";

interface TableProps {
  data: OptionDetails[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-blue-500 dark:bg-gray-700 text-white">
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
              Type
            </th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
              Strike Price
            </th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
              Max Profit
            </th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
              Max Loss
            </th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
              Breakeven
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
            >
              <td className="py-3 px-4 text-center border-b border-gray-300 dark:border-gray-600">
                {row.type}
              </td>
              <td className="py-3 px-4 text-center border-b border-gray-300 dark:border-gray-600">
                {row.strikePrice}
              </td>
              <td className="py-3 px-4 text-center border-b border-gray-300 dark:border-gray-600 text-green-600">
                +{row.maxProfit}
              </td>
              <td className="py-3 px-4 text-center border-b border-gray-300 dark:border-gray-600 text-red-600">
                -{row.maxLoss}
              </td>
              <td className="py-3 px-4 text-center border-b border-gray-300 dark:border-gray-600">
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
