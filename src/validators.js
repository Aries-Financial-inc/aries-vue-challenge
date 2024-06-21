export const validateOption = (option) => {
  return (
    typeof option.strike_price === 'number' &&
    typeof option.type === 'string' &&
    typeof option.bid === 'number' &&
    typeof option.ask === 'number' &&
    typeof option.long_short === 'string' &&
    typeof option.expiration_date === 'string'
  );
};

export const validateOptionsArray = (value) => {
  return value.every(validateOption);
};
