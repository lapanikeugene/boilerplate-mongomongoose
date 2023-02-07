require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err,db)=>{

  if(err) console.log("connection error");
});

let personSchema = new mongoose.Schema({
  name:{type:String, required:true},
  age:Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  console.log(process.env.MONGO_URI);
  console.log(mongoose.connection.readyState);

  console.log("creating persona");
  const person = new Person({
    name: "Mona",
    age: 16,
    favoriteFoods: ["Test", "French fries"]
  });

  person.save(function(err, data) {
    console.log("data:",data);
    done(null, data);
  }); 
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return console.log(err);
    done(null, data);

  })

};

const findPeopleByName = (personName, done) => {
  Person.find({person:personName},(err,data)=>{
    if(err) return console.log(err);
    done(null, data);

  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) return console.log(err);
    done(null,data);

  })
};

// When saving a document, MongoDB automatically adds the field _id, and set it to a unique alphanumeric key. 
// Searching by _id is an extremely frequent operation, so Mongoose provides a dedicated method for it.
const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if(err) return console.log(err);
    done(null,data);
  })
  // done(null /*, data*/);
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId,(err,data)=>{
    data.favoriteFoods.push(foodToAdd);
    data.save((err,updatedData)=>{
      if(err)return console.log(err);
      done(null,updatedData);

    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //{new:true} return updated document
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(err) return console.log(err);
    done(null,data);
  })

  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findOneAndRemove(personId,(err,data)=>{
    done(null,data);
  })

  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  // const nameToRemove = "Mary";
  // Person.deleteMany({name:nameToRemove},
  // (err,data)=>{
  //   if(err) return console.log(err);
  //   done(null,data)}
  // )

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: foodToSearch })
  .exec(function(err, data) {
    //do something here
    if(err) return console.log(err);
    done(null,data);
  });
  
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
