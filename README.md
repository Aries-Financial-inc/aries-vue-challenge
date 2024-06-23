# Options Strategy Risk & Reward Analysis

This project is a React application designed to analyze the risk and reward of options trading strategies. The application allows users to input up to four options contracts and outputs a risk & reward graph, along with key metrics such as max profit, max loss, and breakeven points.

## Application Screenshot

![Application Screenshot](./assets/web_app.png)

## Features

- **Options Contract Form**:

  - Add options contracts with fields for type (call/put), strike price, bid, ask, and long/short.
  - Default values for new options contracts.
  - Validation to ensure all fields are filled before calculation.
  - Dynamic removal of individual contracts.
  - Scrollable container for the contracts list if more than 3 contracts are added.
  - Stylish, responsive, and dark mode-compatible form with Tailwind CSS.

- **Risk & Reward Graph**:

  - Generates a risk & reward graph where X is the price of the underlying at the time of expiry and Y is the profit/loss at that price.
  - Dynamic plotting of multiple lines on the same graph for different contracts.
  - X-axis labeled as "Price at Expiry" and Y-axis labeled as "Profit/Loss".
  - Stylish, responsive, and dark mode-compatible graph with Tailwind CSS.
  - Utilizes the Recharts library for plotting the graph.

- **Key Metrics Table**:

  - Displays key metrics for each option: Type, Strike Price, Max Profit, Max Loss, and Breakeven.
  - Stylish, responsive, and dark mode-compatible table with Tailwind CSS.
  - Consistent rounded corners and borders for a cohesive look.

- **Dark Mode**:

  - Entire application supports dark mode with a toggle button.
  - Dark mode styles applied across all components.
  - Persistent theme setting stored in localStorage.

- **Main Layout**:

  - Centralized layout component managing the theme toggle and overall structure.
  - Consistent styling and responsiveness across the application.

- **Utility Functions**:

  - Calculation of premiums based on bid and ask prices.
  - Calculation of profit/loss for different option strategies.
  - Validation functions to ensure all necessary fields are filled.

- **Notifications and User Feedback**:

  - Alerts users to fill in all required fields if any are missing during calculation.

- **Responsive Design**:
  - Mobile-friendly and responsive layout and components.
  - Utilizes Tailwind CSS for easy and flexible styling.

## Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later) or yarn (version 1.x or later)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/RushikeshGandhmal/aries-react-challenge.git
cd aries-react-challenge
```

### Install Dependencies

Using npm:

```sh
npm install
```

Or using yarn:

```sh
yarn install
```

### Run the Application

Using npm:

```sh
npm run dev
```

Or using yarn:

```sh
yarn dev
```

The application should now be running on [http://localhost:5173/](http://localhost:5173/).

## Project Structure

- `src/components`: Contains the React components used in the application.
  - `Chart.tsx`: Component for rendering the risk & reward graph.
  - `Layout.tsx`: Layout component that includes the header and theme toggle.
  - `OptionsForm.tsx`: Form component for adding and managing options contracts.
  - `Table.tsx`: Component for displaying key metrics of the options contracts.
- `constants/index.ts`: Contains constants used across the application, such as default option values.
- `src/context`: Contains context for managing global state, such as theme.
  - `ThemeContext.tsx`: Context provider for managing dark/light theme.
- `types`: Contains TypeScript type definitions.
  - `options.ts`: Type definitions for options contracts and analysis results.
- `utils`: Contains utility functions for calculations.
  - `calculations.ts`: Functions for calculating profit/loss and risk/reward metrics.
  - `riskRewardOptions.ts`: Functions for validating options contracts.
  - `riskReward.ts`: Functions for calculating premiums and profit/loss.
- `src/App.tsx`: The main application component.
- `src/main.tsx`: The entry point of the application.
