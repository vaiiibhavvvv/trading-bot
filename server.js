import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const PORT = process.env.PORT || 3000;
const server = express();

// API to get trade history

server.get('/api/trades', async (req,res) => {

  try {
    
    const tradesPath = path.join(__dirname,'data','trades.json');
    const data = await fs.readFile(tradesPath,'utf-8');
    res.json(JSON.parse(data));

  } catch (error) {
    console.error('Error fetching trade historoy:', error.message);
    res.status(500).json({error: 'Internal server error'});
  }

});

server.get('/', (req,res)=>{

  try {
    res.send('Trading bot is running');
  } catch (error) {
    console.error('Error serving homepage:', error.message);
    res.status(500).json({error: 'Internal sever error'});
  }

});

server.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`)
});
