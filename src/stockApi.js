
 export class StockApi{

  constructor(){
    this.price = 100;
  }

  // Simulate random price fluctuations

  getPrice = () => {

    try{
      const change = (Math.random() - 0.5)*2;
      this.price = Math.max(1,this.price + change);
      return this.price.toFixed(2);

    } catch(error){
      console.error('Error fetching price :', error.message);
      return null;
    }

  }

}

