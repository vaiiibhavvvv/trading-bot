import { StockApi } from "./stockApi";
import { Strategy } from "./strategy";
import { Trade } from "./trade";
import config from "../config/config";

const stockApi = new StockApi();
const strategy = new Strategy(config.buyThreshold,config.sellThreshold);
const trade = new Trade();

export const runTradingBot = async () => {

try {
  
    const currentPrice = stockApi.getPrice();
    if(!currentPrice){
      throw new Error('Invalid stock price received');
    }
    
   // console.log('Current Price: ${currentPrice}');
   console.log(`Current Price: ${currentPrice}`);

    //Apply strategy
    strategy.updatePeak(currentPrice);

    if(trade.shares === 0 && strategy.shouldBuy(currentPrice)){
        trade.buy(currentPrice);
    }
    else if(trade.shares > 0 && strategy.shouldSell(currentPrice,trade.tradeHistory[trade.tradeHistory.length - 1].getPrice)){
      trade.sell(currentPrice);
    }

    await trade.trackTrades();

    console.log(`Profit/Loss: ${trade.getTotalProfit()}`);
    console.log('Trade History:', trade.getTradeSummary());

} catch (error) {
  
  console.error('Error running trading bot:',error.message);

}

}

setInterval(runTradingBot,config.priceFeedInterval);