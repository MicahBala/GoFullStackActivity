// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

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

// POST a recipe
app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });

  recipe
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Recipe saved successfully!'
      });
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
});

// GET all recipes
app.get('/api/recipes', (req, res, next) => {
  Recipe.find()
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

// GET a single recipe
app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
});

// PUT: modify/update a single recipe
app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });

  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({
        message: 'Recipe updated'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

// DELETE a recipe
app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Recipe deleted successfully!'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

module.exports = app;
