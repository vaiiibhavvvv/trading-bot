import fs from 'fs/promises';
import path, { dirname } from 'path';
import config from "../config/config.js";

export class Trade{

  constructor(){
    this.capital = config.initialCapital;
    this.shares = 0;
    this.tradeHistory = [];
  }

  buy = (price) => {

    try {
      
      const sharesToBuy = Math.floor(this.capital/price);
    if(sharesToBuy > 0)
          {
      this.shares += sharesToBuy;
      this.capital -= sharesToBuy*price;
      this.tradeHistory.push({type:'buy',price, shares: sharesToBuy});
        console.log(`Bought ${sharesToBuy} shares at ${price}`);

    }
    else{
      console.log('Not enough capital to buy.');
    }

       }catch (error) {

      console.error('Error while placing a buy order',error.message);

    }

    

  }
  
  sell = (price) => {

    try {
      
      if(this.shares > 0){
        this.capital += this.shares*price;
        this.tradeHistory.push({type: 'sell',price, shares: this.shares});
        console.log('Sold ${this.shares} shares at ${price}');
        this.shares = 0;
      }

      else{

        console.log('No buying orders');

      }

    } catch (error) {

      console.error("Error while placing a sell order",error.message);

    }
    
  }

  trackTrades = async () => {

    try {
      
      const filePath = path.join(__dirname,'../data/trades.json');
      await fs.writeFile(filePath,JSON.stringify(this.tradeHistory,null,2));
      
    } catch (error) {
      console.error('Error writing trade history to file:',error.message);
    }

  }

  getTotalProfit = () => {
    try {
      let totalProfit = this.capital - config.initialCapital;
    this.tradeHistory.forEach(trade =>{
      if(trade.type === 'sell'){
        totalProfit += (trade.shares*trade.price);
      }
    });
    return totalProfit.toFixed(2);

    } catch (error) {
      console.error('Error calculating profit',error.message);
      return null;
    }

  }

  getTradeSummary = () => {

    try {
      return this.tradeHistory.map( trade=> ({
        type: trade.type,
        price: trade.price,
        shares: this.shares

      }));
  
    } catch (error) {
      
      console.error('Error generating trade summary:', error.message);
      return [];

    }
    
  }

}

