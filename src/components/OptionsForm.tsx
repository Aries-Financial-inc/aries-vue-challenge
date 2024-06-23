import React, { useEffect, useState } from "react";
import { DEFAULT_OPTION_CONTRACT } from "../../constants";
import { OptionContract } from "../../types/options";

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
    onCalculate(localContracts);
  };

  return (
    <div className="options-form mb-4">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-800">
        Options Contract
      </h2>
      {localContracts.map((contract, index) => (
        <div
          key={index}
          className="flex flex-wrap mb-4 p-4 border border-gray-200 rounded-lg bg-blue-50 shadow-sm"
        >
          <div className="w-full md:w-1/5 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600">
              Type
            </label>
            <select
              value={contract.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="call">Call</option>
              <option value="put">Put</option>
            </select>
          </div>
          <div className="w-full md:w-1/5 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600">
              Strike Price
            </label>
            <input
              type="number"
              value={contract.strikePrice}
              onChange={(e) =>
                handleInputChange(index, "strikePrice", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Strike Price"
            />
          </div>
          <div className="w-full md:w-1/5 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600">
              Premium
            </label>
            <input
              type="number"
              value={contract.premium}
              onChange={(e) =>
                handleInputChange(index, "premium", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Premium"
            />
          </div>
          <div className="w-full md:w-1/5 mb-2 md:mb-0 md:pr-2">
            <label className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              value={contract.quantity}
              onChange={(e) =>
                handleInputChange(index, "quantity", Number(e.target.value))
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quantity"
            />
          </div>
          <div className="w-full md:w-1/5 flex items-end mb-2 md:mb-0">
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
