require("dotenv").config();

const mongoose = require("mongoose");

// -----------------------------------------------------------------------------
// DATABASE CONNECTION
// -----------------------------------------------------------------------------
// The checkpoint explicitly requests the legacy Mongoose connection options
// shown below. This project pins Mongoose 5.13.x so the requested callback
// APIs and connection options remain compatible with the assignment.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Helpful connection logging.
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to MongoDB.");
});

mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error:", err.message);
});

// -----------------------------------------------------------------------------
// PERSON SCHEMA + MODEL
// -----------------------------------------------------------------------------
const personSchema = new mongoose.Schema({
  // name is required by the checkpoint.
  name: {
    type: String,
    required: true,
    trim: true
  },

  // age is optional.
  age: {
    type: Number,
    min: 0
  },

  // The assignment asks for an array of strings.
  favoriteFoods: {
    type: [String],
    default: []
  }
});

const Person = mongoose.model("Person", personSchema);

// -----------------------------------------------------------------------------
// 1. CREATE AND SAVE ONE RECORD
// -----------------------------------------------------------------------------
function createAndSavePerson(done) {
  // Create one document instance using the Person constructor.
  const person = new Person({
    name: "Taher",
    age: 25,
    favoriteFoods: ["couscous", "pizza"]
  });

  // save() uses the Node-style callback requested by the checkpoint.
  person.save(function (err, data) {
    if (err) {
      return done(err);
    }

    done(null, data);
  });
}

// -----------------------------------------------------------------------------
// 2. CREATE MANY RECORDS WITH Model.create()
// -----------------------------------------------------------------------------
function createManyPeople(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      return done(err);
    }

    done(null, people);
  });
}

// -----------------------------------------------------------------------------
// 3. FIND ALL PEOPLE HAVING A GIVEN NAME
// -----------------------------------------------------------------------------
function findPeopleByName(personName, done) {
  Person.find({ name: personName }, function (err, people) {
    if (err) {
      return done(err);
    }

    done(null, people);
  });
}

// -----------------------------------------------------------------------------
// 4. FIND ONE PERSON WHO LIKES A CERTAIN FOOD
// -----------------------------------------------------------------------------
function findOneByFood(food, done) {
  Person.findOne(
    {
      favoriteFoods: food
    },
    function (err, person) {
      if (err) {
        return done(err);
      }

      done(null, person);
    }
  );
}

// -----------------------------------------------------------------------------
// 5. FIND A PERSON BY _id
// -----------------------------------------------------------------------------
function findPersonById(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) {
      return done(err);
    }

    done(null, person);
  });
}

// -----------------------------------------------------------------------------
// 6. CLASSIC UPDATE: FIND -> EDIT -> SAVE
// -----------------------------------------------------------------------------
function findEditThenSave(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) {
      return done(err);
    }

    if (!person) {
      return done(new Error("Person not found."));
    }

    // Because favoriteFoods is explicitly declared as [String], Mongoose
    // tracks changes automatically. markModified() is not required here.
    person.favoriteFoods.push("hamburger");

    person.save(function (saveErr, updatedPerson) {
      if (saveErr) {
        return done(saveErr);
      }

      done(null, updatedPerson);
    });
  });
}

// -----------------------------------------------------------------------------
// 7. UPDATE WITH findOneAndUpdate()
// -----------------------------------------------------------------------------
function findAndUpdate(personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: 20 } },
    { new: true },
    function (err, updatedPerson) {
      if (err) {
        return done(err);
      }

      done(null, updatedPerson);
    }
  );
}

// -----------------------------------------------------------------------------
// 8. DELETE ONE PERSON WITH findByIdAndRemove()
// -----------------------------------------------------------------------------
function removeById(personId, done) {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) {
      return done(err);
    }

    done(null, removedPerson);
  });
}

// -----------------------------------------------------------------------------
// 9. DELETE ALL PEOPLE NAMED "Mary" WITH Model.remove()
// -----------------------------------------------------------------------------
function removeManyPeople(done) {
  Person.remove({ name: "Mary" }, function (err, result) {
    if (err) {
      return done(err);
    }

    done(null, result);
  });
}

// -----------------------------------------------------------------------------
// 10. CHAIN QUERY HELPERS
// -----------------------------------------------------------------------------
function queryChain(done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      if (err) {
        return done(err);
      }

      done(null, data);
    });
}

// Export the model and every checkpoint function so each operation can be
// tested independently.
module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
};
