export function calculateProfitLossData(options) {
    // Generate a range of underlying prices for the X-axis
    const minPrice = Math.min(...options.map(option => option.strike_price)) - 20;
    const maxPrice = Math.max(...options.map(option => option.strike_price)) + 20;
    const underlyingPrices = [];
    for (let i = minPrice; i <= maxPrice; i += 0.5) {
        underlyingPrices.push(i);
    }

    // Calculate profit/loss for each price point
    const profitLoss = underlyingPrices.map(price => {
        return options.reduce((totalProfitLoss, option) => {
            const intrinsicValue = getIntrinsicValue(option, price);
            const profitLossPerOption = option.long_short === 'long' ? intrinsicValue - option.ask : option.bid - intrinsicValue;
            return totalProfitLoss + profitLossPerOption;
        }, 0);
    });

    // Calculate max profit, max loss, and break-even points
    const maxProfit = Math.max(...profitLoss);
    const maxLoss = Math.min(...profitLoss);
    const breakEvenPoints = findBreakEvenPoints(underlyingPrices, profitLoss);

    return {
        chartData: {
            labels: underlyingPrices,
            datasets: [
                {
                    label: 'Profit / Loss',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(46, 204, 113, 1)',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(46, 204, 113, 1)',
                    data: profitLoss,
                    fill: false
                }
            ]
        },
        maxProfit,
        maxLoss,
        breakEvenPoints
    };
}
function getIntrinsicValue(option, underlyingPrice) {
    if (option.type === 'Call') {
        return Math.max(0, underlyingPrice - option.strike_price);
    } else if (option.type === 'Put') {
        return Math.max(0, option.strike_price - underlyingPrice);
    }
    return 0;
}
function findBreakEvenPoints(prices, profitLoss) {
    const breakEvenPoints = [];
    for (let i = 1; i < prices.length; i++) {
        if (profitLoss[i - 1] < 0 && profitLoss[i] > 0 || profitLoss[i - 1] > 0 && profitLoss[i] < 0) {
            breakEvenPoints.push(prices[i]);
        }
    }
    return breakEvenPoints;
}