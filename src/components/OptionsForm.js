import React, { useState } from 'react';

const OptionsForm = ({ onAddOption }) => {
  const [option, setOption] = useState({ type: '', strike: '', premium: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOption({ ...option, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOption(option);
    setOption({ type: '', strike: '', premium: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="type" value={option.type} onChange={handleChange} placeholder="Type (call/put)" required />
      <input type="number" name="strike" value={option.strike} onChange={handleChange} placeholder="Strike Price (100)" required />
      <input type="number" name="premium" value={option.premium} onChange={handleChange} placeholder="Premium (10)" required />
      <input type="number" name="quantity" value={option.quantity} onChange={handleChange} placeholder="Quantity (1)" required />
      <button type="submit">Add Option</button>
    </form>
  );
};

export default OptionsForm;
