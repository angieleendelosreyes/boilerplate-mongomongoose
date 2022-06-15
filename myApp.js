require('dotenv').config();
var mongoose = require('mongoose');
let Person;

console.log('database uri>>>', typeof process.env.MONGO_URI, process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () =>
      console.log("connected"));
} catch (error) {
  console.log("could not connect");
}





try {
  let personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [String],
  })
  Person = mongoose.model("Person", personSchema);
  console.log('person', Person);
} catch (error) {
  console.log("could not create person");
}

const createAndSavePerson = (done) => {

  var angie = new Person({ name: "Angie", age: 27, favoriteFoods: ["eggs", "bread", "fresh fruit"] });

  angie.save(function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
  // done(null /*, data*/);

};



const createManyPeople = (arrayOfPeople, done) => {
  console.log('arrayOfPeople', arrayOfPeople);

  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
};


const findPeopleByName = (personName, done) => {
  console.log('personName', personName);
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  console.log('food', food);
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  console.log('personId', personId);
  Person.findOne(personId, function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;


  Person.findOneAndUpdate({name: personName},{age: ageToSet}, { new: true}, function(err, data) {
    if (err) return console.error(err);
    console.log('data', data);
    done(null, data)
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
