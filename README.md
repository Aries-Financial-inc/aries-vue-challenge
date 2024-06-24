Options Profit Calculator
=========================

This project is a Vue.js application for analyzing options strategies' risk and reward. It allows users to input options contracts and generates a graph showing profit and loss at different prices of the underlying asset at expiry.

Table of Contents
-----------------

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Clone the Repository](#clone-the-repository)
    -   [Install Packages](#install-packages)
    -   [Run the Development Environment](#run-the-development-environment)
    -   [Build for Production](#build-for-production)
-   [Usage](#usage)

Features
--------

-   Input up to four options contracts
-   Generates a risk & reward graph
-   Displays maximum profit, maximum loss, and break-even points

Getting Started
---------------

### Clone the Repository

To clone the repository, run the following command in your terminal:

`git clone https://github.com/Aries-Financial-inc/aries-vue-challenge && cd options-profit-calculator`

### Install Packages

Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages using npm:

`npm install`

### Run the Development Environment

To start the development server, run:

`npm run serve`

This will start the app and you can view it in your browser at `http://localhost:8080`.

### Build for Production

To build the project for production, run:

`npm run build`

The production-ready files will be generated in the `dist` directory.

Usage
-----

Once you have the development server running, you can use the application as follows:

1.  Enter the details for each options contract (type, strike price, and premium).
2.  Click the "Add Contract" button to add up to four contracts.
3.  Click the "Generate Graph" button to generate the risk & reward graph.
4.  View the graph and the calculated results (maximum profit, maximum loss, and break-even points).
