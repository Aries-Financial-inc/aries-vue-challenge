import React, { useState, useEffect } from "react";
import { OptionContract } from "../../types/options";
import { DEFAULT_OPTION_CONTRACT } from "../../constants";
import { isOptionFilled } from "../../utils/riskRewardOptions";

interface OptionsFormProps {
  contracts: OptionContract[];
  onCalculate: (contracts: OptionContract[]) => void;
}

const OptionsForm: React.FC<OptionsFormProps> = ({
  contracts,
  onCalculate,
}) => {
  const [localContracts, setLocalContracts] = useState<OptionContract[]>([]);

  useEffect(() => {
    setLocalContracts(contracts);
  }, [contracts]);

  const addContract = () => {
    setLocalContracts([...localContracts, { ...DEFAULT_OPTION_CONTRACT }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof OptionContract,
    value: string | number
  ) => {
    const updatedContracts = localContracts.map((contract, i) =>
      i === index ? { ...contract, [field]: value } : contract
    );
    setLocalContracts(updatedContracts);
  };

  const handleRemoveContract = (index: number) => {
    const updatedContracts = localContracts.filter((_, i) => i !== index);
    setLocalContracts(updatedContracts);
    onCalculate(updatedContracts);
  };

  const handleSubmit = () => {
    if (localContracts.every(isOptionFilled)) {
      onCalculate(localContracts);
    } else {
      alert("Please fill in all fields for all options.");
    }
  };

  return (
    <div className="options-form mb-4">
      <h2 className="text-center text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
        Options Contract
      </h2>
      {localContracts.map((contract, index) => (
        <div
          key={index}
          className="flex flex-wrap mb-4 p-4 border border-gray-200 rounded-lg bg-blue-50 dark:bg-gray-700 shadow-sm"
        >
          <div className="w-full md:w-1/6 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Type
            </label>
            <select
              value={contract.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="call">Call</option>
              <option value="put">Put</option>
            </select>
          </div>
          <div className="w-full md:w-1/6 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Strike Price
            </label>
            <input
              type="number"
              value={contract.strikePrice}
              onChange={(e) =>
                handleInputChange(index, "strikePrice", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Strike Price"
            />
          </div>
          <div className="w-full md:w-1/6 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Bid
            </label>
            <input
              type="number"
              value={contract.bid}
              onChange={(e) =>
                handleInputChange(index, "bid", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Bid"
            />
          </div>
          <div className="w-full md:w-1/6 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Ask
            </label>
            <input
              type="number"
              value={contract.ask}
              onChange={(e) =>
                handleInputChange(index, "ask", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Ask"
            />
          </div>
          <div className="w-full md:w-1/6 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Long/Short
            </label>
            <select
              value={contract.long_short}
              onChange={(e) =>
                handleInputChange(index, "long_short", e.target.value)
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>
          <div className="w-full md:w-1/6 flex items-end mb-2 md:mb-0">
            <button
              type="button"
              onClick={() => handleRemoveContract(index)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={addContract}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Contract
        </button>
        {localContracts.length > 0 && (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
          >
            Calculate
          </button>
        )}
      </div>
    </div>
  );
};

export default OptionsForm;
