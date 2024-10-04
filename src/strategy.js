
export class Strategy{

  constructor(buyThreshold, sellThreshold){
    this.lastPeak = 100;
    this.buyThreshold = buyThreshold;
    this.sellThreshold = sellThreshold;
  }

  shouldBuy = (currentPrice) => {
   try {
    
    if(currentPrice < this.lastPeak*this.buyThreshold){
      this.lastPeak = currentPrice;
      return true;
    }
    return false;

   } catch (error) {
    
      console.log('Error in buying strategy:', error.message);
      return false;

   }

  }

  shouldSell = (currentPrice, purchasePrice) =>{
    try {
      return currentPrice > purchasePrice*this.sellThreshold;
    
    } catch (error) {

      console.error('Error in sell strategy:',error.message);

    }
    
  }

  updatePeak = (currentPrice) => {
   try {

    if(currentPrice > this.lastPeak){
      this.lastPeak = currentPrice;
    }

   } catch (error) {

    console.error('Error updataing price peak:', error.message);

   }
  }
}

