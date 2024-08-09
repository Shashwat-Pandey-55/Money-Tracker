// const express = require('express');
// const app = express();
// const cors=require('cors');


// // const mongoose = require('mongoose');
// // require('dotenv').config();
// // const Transaction=require('./models/Transaction.js');

// app.use(cors());
// // app.use(express.json());


// app.get('/api/test', (req, res) => {
//     res.json({ body: 'test ok2222' });
// });

// app.post('/api/transaction', async(req, res) => {
//     // await mongoose.connect(process.env.MONGO_URL);
//     // console.log(process.env.MONGO_URL);
//     // const{name,description,datetime}=req.body;
//     // const transaction= await Transaction.create({name,description,datetime});
//     res.json(req.body);
// });

// app.listen(4040);






const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Transaction=require('./models/Transaction.js');

app.use(cors());
app.use(express.json()); // This line parses incoming requests with JSON payloads

app.get('/api/test', (req, res) => {
  res.json({ body: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  //console.log(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;

  const transaction = await Transaction.create({name,description,datetime, price});

  console.log('Received transaction:', { name, description, datetime, price });
  res.json(transaction);
});

app.get('/api/transactions', async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4040, () => {
  console.log('Server is running on port 4040');
  
  // Print a message when MongoDB connection is successful
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to MongoDB successfully!');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
});

//LDCHdEf4Gww0htjk