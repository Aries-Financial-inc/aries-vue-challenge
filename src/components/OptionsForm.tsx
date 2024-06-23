import React, { useState } from "react";
import { OptionContract } from "../../types/options";
import { DEFAULT_OPTION_CONTRACT } from "../../constants";

interface OptionsFormProps {
  onCalculate: (contracts: OptionContract[]) => void;
}

const OptionsForm: React.FC<OptionsFormProps> = ({ onCalculate }) => {
  const [contracts, setContracts] = useState<OptionContract[]>([
    DEFAULT_OPTION_CONTRACT,
  ]);

  const addContract = () => {
    setContracts([...contracts, { ...DEFAULT_OPTION_CONTRACT }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof OptionContract,
    value: string | number
  ) => {
    const updatedContracts = contracts.map((contract, i) =>
      i === index ? { ...contract, [field]: value } : contract
    );
    setContracts(updatedContracts);
  };

  const handleSubmit = () => {
    onCalculate(contracts);
  };

  return (
    <div className="options-form mb-4">
      {contracts.map((contract, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <select
            value={contract.type}
            onChange={(e) => handleInputChange(index, "type", e.target.value)}
            className="p-2 border rounded"
          >
            <option value="call">Call</option>
            <option value="put">Put</option>
          </select>
          <input
            type="number"
            value={contract.strikePrice}
            onChange={(e) =>
              handleInputChange(index, "strikePrice", Number(e.target.value))
            }
            className="p-2 border rounded"
            placeholder="Strike Price"
          />
          <input
            type="number"
            value={contract.premium}
            onChange={(e) =>
              handleInputChange(index, "premium", Number(e.target.value))
            }
            className="p-2 border rounded"
            placeholder="Premium"
          />
          <input
            type="number"
            value={contract.quantity}
            onChange={(e) =>
              handleInputChange(index, "quantity", Number(e.target.value))
            }
            className="p-2 border rounded"
            placeholder="Quantity"
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <button
          onClick={addContract}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Contract
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default OptionsForm;
