let mongoose = require('mongoose')
// let validator = require('validator')

let personSchema = new mongoose.Schema({
    person: {
      name : {
        type: String,
        required: true
        },
      age :  Number,
      favoriteFoods : [],
    }});
Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model('Person', personSchema)