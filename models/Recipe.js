var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
  name: String,
  country: String,
  ingredients: [{quantity: String, name: String}],
  steps: [String],
  timers: [Number],
  imageURL: String,
  originalURL: String
});

mongoose.model('Recipe', RecipeSchema);
