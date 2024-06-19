# Risk-Reward Graph


## What I've done
- Installed `TailwindCss` for styling and productivity
- Installed `vue-chartjs` and `chart.js` for drawing the risk-reward graph
- Implemented the risk-reward ratio graph regarding the sample options strategies


## How I've done

- Used this algorithm to calculate x axes and y axes values to draw chart
```javascript
export function generateChartData(option) {
  const { strike_price, type, bid, ask, long_short, expiration_date } = option;

  let priceX = [];
  let profitLossY = [];

  const dateRange = getExpiryPriceRange(expiration_date);

  for (let price = 0; price <= dateRange; price++ ) {
    let profit;

    if (type === 'Call') {
      profit = long_short === 'long' ? Math.max(0, price - strike_price) - ask : Math.min(0, strike_price - price) + bid;
    } else if (type === 'Put') {
      profit = long_short === 'long' ? Math.max(0, strike_price - price) - ask : Math.min(0, price - strike_price) + bid;
    }

    priceX.push(price);
    profitLossY.push(profit);
  }

  return {
    x: priceX,
    y: profitLossY,
  }
}
```

- Used this algorithm to calculate the risk-reward ratio and profit probability
```javascript
const maxProfit = Math.max(...profitLoss);
const maxLoss = Math.min(...profitLoss);

const ratio = maxProfit / Math.abs(maxLoss);
```
```javascript
const totalScenarios = profitLoss.length;
const profitableScenarios = profitLoss.filter(profit => profit > 0).length;

const profitProbability = ((profitableScenarios / totalScenarios) * 100).toFixed(0);
```
