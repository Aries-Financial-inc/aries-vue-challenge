# Options Profit/Loss Chart Vue Component

This project is a Vue component designed for generating a profit/loss chart for options strategies.

## Overview

The Options Profit/Loss Chart Vue Component allows users to visualize the potential profit or loss of various options strategies based on provided contract details. It calculates and displays the profit or loss at different underlying prices at the time of expiry.

## Features

- **Dynamic Chart Generation**: Generates a dynamic line chart where the X-axis represents the price of the underlying asset, and the Y-axis represents the profit or loss at that price.
- **Visualization of Options Strategies**: Supports up to four options contracts (calls or puts) with details such as strike price, type (Call/Put), bid/ask prices, and whether the position is long or short.
- **Key Metrics Display**: Calculates and displays key metrics including maximum profit, maximum loss, and break-even points for the selected options strategy.

## Installation

To install and use the Options Profit/Loss Chart Vue Component in your Vue.js project, follow these steps:

1. **Install the dependencies**:
   ```bash
   npm install
   ```
2. **To run the project, use the following command**:
   ```bash
   npm run serve
   ```

## Dependencies

This project relies on the following dependencies:

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Chart.js**: Simple yet flexible JavaScript charting library for data visualization.

Make sure these dependencies are installed in your project environment before using the Options Profit/Loss Chart Vue Component.

## Contact

For questions or support regarding this project, please contact Kevin Zhao at [pharospulse@gmail.com].
