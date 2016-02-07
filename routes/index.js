var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Country = mongoose.model('Country');
var Recipe = mongoose.model('Recipe');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map', function(req, res, next) {
  res.render('maps', { title: 'Maps' });
});

router.get('/country/:id/recipes', function(req, res, next) {
  Country.find(function(err, recipes) {
    if(err){ return next(err); }

    res.json(recipes);
  });

});

router.post('/country/:id/recipes', function(req, res, next) {
  var recipe = new Recipe(req.body);

  recipe.save(function(err, recipe) {
    if(err){ return next(err); }

    res.json(recipe);
  });
});

router.param('country', function(req, res, next, country) {

});

router.param('recipe', function(req, res, next, id) {
  console.log(req);
  console.log(res);
  var query = Recipe.findById(id);

  query.exec(function(err, recipe) {
    if(err){ return next(err); }
    if(!data){ next(new Error('Recipe does not exist')); }

    req.recipe = recipe;
    return next();
  });
});

router.get('/recipes/:recipe', function(req, res, next) {
  res.json(req.recipe);
});

module.exports = router;
