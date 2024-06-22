// Generate chart data with labels and datasets
export const generateChartData = (options) => {
  const labels = generateUnderlyingLabels(options);
  return {
    labels,
    datasets: generateChart(options, labels),
  };
};

// Generate labels for the underlying prices based on options
const generateUnderlyingLabels = (options) => {
  const minPrice = Math.min(...options.map((option) => option.strike_price)) - 10;
  const maxPrice = Math.max(...options.map((option) => option.strike_price)) + 10;
  const underlyingPrices = [];

  for (let i = minPrice; i <= maxPrice; i += 0.5) {
    underlyingPrices.push(i);
  }

  return underlyingPrices;
};

// Calculate the premium based on bid and ask prices
const calculatePremium = (bid, ask) => (bid + ask) / 2;

// Generate chart datasets for each option
const generateChart = (options, labels) => {
  const datasets = options.map((option) => {
    const { strike_price: strikePrice, type: optionType, bid, ask, long_short: longShort } = option;
    const premium = calculatePremium(bid, ask);

    const data = labels.map((price) => {
      if (optionType === "Call") {
        return longShort === "long"
          ? Math.max(price - strikePrice, 0) - premium
          : premium - Math.max(price - strikePrice, 0);
      } else { // Put
        return longShort === "long"
          ? Math.max(strikePrice - price, 0) - premium
          : premium - Math.max(strikePrice - price, 0);
      }
    });

    return {
      label: `${capitalize(longShort)} ${optionType} @ ${strikePrice}`,
      data,
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    };
  });

  return datasets;
};

// Capitalize the first letter of a string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
