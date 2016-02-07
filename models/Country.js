var mongoose = require('mongoose');

var CountrySchema = new mongoose.Schema({
    name: String,
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }]
});

mongoose.model('Country', CountrySchema);