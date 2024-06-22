# Options Strategy Risk and Reward Analysis
Overview
This project is a Vue.js component that generates a risk and reward graph for options strategies. It accepts input for up to four options contracts in JSON format and outputs the following:

Risk and reward graph where the X-axis is the price of the underlying at the time of expiry and the Y-axis is the profit/loss at that price.
Maximum profit, maximum loss, and all break-even points.

# Installation
Clone the repository:

Navigate to the project directory:


Install dependencies:


npm install
Usage
Start the development server:


npm run serve
Open your browser and navigate to http://localhost:8080 to view the application.

Enter up to four options contracts in JSON format in the textarea and click the "Calculate" button to generate the risk and reward graph.

# Example JSON Input

[
  {
    "type": "call",
    "strike": 100,
    "price": 5
  },
  {
    "type": "put",
    "strike": 110,
    "price": 3
  }
]
# Dependencies
Vue.js
Chart.js

# License
This project is licensed under the MIT License - see the LICENSE file for details.#