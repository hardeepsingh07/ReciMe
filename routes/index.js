var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/map', function(req, res, next) {
  res.render('maps', { title: 'Maps' });
});

router.get('/recipes', function(req, res, next) {

/*
  Recipe.findOne({country: req.query.country}, 'name country ingredients steps', function(err, recipe) {


    console.log(recipe);
    if (err) return handleError(err);
    res.json(recipe);
    console.log(recipe[0].name + ' ' + recipe[0].country + ' ' + recipe[0].steps);
  });
  */
  console.log("countryname = " + req.query.country);

  var query = Recipe.find({ country: req.query.country });
  query.exec(function(err, recipe) {
    if(err){ return next(err); }
    console.log("recipe= " + recipe);
    res.json(recipe);
  });

});

router.post('/recipes', function(req, res, next) {
  console.log(req.body);
  var recipe = new Recipe({
    name: req.body.name,
    country: req.body.country,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    timers: req.body.timers,
    imageURL: req.body.imageURL,
    originalURL: req.body.originalURL
  });

  recipe.save(function(err, post) {
    if(err){ return next(err); }

    res.json(recipe);
  });
});

router.param('recipe', function(req, res, next, id) {
  console.log("id = " + id);
  var query = Recipe.findById(id);

  query.exec(function(err, recipe) {
    if(err){ return next(err); }
    if(!recipe){ next(new Error('Recipe does not exist')); }

    req.recipe = recipe;
    return next();
  });
});

router.get('/recipes/:recipe', function(req, res, next) {
  res.json(req.recipe);
});

module.exports = router;
