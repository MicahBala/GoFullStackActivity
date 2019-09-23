// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB Atlas
const conString =
  'mongodb+srv://micahbala:sURO9yuNqbgChKsV@cluster0-stas6.mongodb.net/test?retryWrites=true&w=majority';
mongoose
  .connect(conString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDb Atlas');
  })
  .catch(error => {
    console.log('Unable to connect to MongoDb Atlas');
    console.error(error);
  });

// implement cross origin resource sharing CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

// POST route
app.post('/api/recipes', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Recipe added successfully'
  });
});

app.use('/api/recipes', (req, res, next) => {
  const recipe = [
    {
      title: 'Popcorn',
      ingredients: 'corn, oil, sugar, and milk',
      instructions: 'heat oil and pour corn',
      time: 20,
      difficulty: 2
    }
  ];
  res.status(200).json(recipe);
});

module.exports = app;
