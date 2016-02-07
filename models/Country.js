var mongoose = require('mongoose');

var CountrySchema = new mongoose.Schema({
  name: String,
  id: String
});

mongoose.model('Country', CountrySchema, 'Countries');
