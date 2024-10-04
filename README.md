# Trading Bot Backend

## Overview

This Node.js application simulates a basic stock trading bot. It monitors stock price changes using a mock API, applies predefined trading strategies, and tracks profit and loss.

## Features

- Simulates real-time stock prices.
- Implements basic buy/sell strategies.
- Tracks trades and calculates profit/loss.
- Configurable settings (initial cash, stock symbol, thresholds).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vaiiibhavvvv/trading-bot
    cd trading-bot
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    node src/app.js
    ```

## Configuration

Configuration settings are in `config/config.js`:
- `initialCapital`: Starting cash for the bot.
- `buyThreshold`: The percentage drop in price to trigger a buy.
- `sellThreshold`: The percentage rise in price to trigger a sell.
- `priceFeedInterval`: How frequently stock prices are updated.

## Profit/Loss Calculation

The bot tracks each trade (buy/sell) and calculates the total profit or loss. You can check the logs for real-time performance updates.
