require("dotenv").config();

const mongoose = require("mongoose");
const {
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
} = require("./myApp");

// This file provides a guided demonstration of all checkpoint operations.
// It uses callback functions because the assignment specifically asks for them.

if (!process.env.MONGO_URI) {
  console.error(
    "Missing MONGO_URI. Copy .env.example to .env and add your MongoDB Atlas URI."
  );
  process.exit(1);
}

function fail(error) {
  console.error("Checkpoint demo failed:", error);
  mongoose.connection.close(function () {
    process.exit(1);
  });
}

function finish() {
  console.log("\n=== CHECKPOINT DEMO COMPLETE ===");
  mongoose.connection.close(function () {
    process.exit(0);
  });
}

// Wait for the connection established in myApp.js.
mongoose.connection.once("open", function () {
  console.log("\n=== RESET DEMO COLLECTION ===");

  // The demo resets only the Person collection used for this checkpoint.
  Person.deleteMany({}, function (resetErr) {
    if (resetErr) {
      return fail(resetErr);
    }

    console.log("Person collection cleared.");

    console.log("\n=== 1. CREATE + SAVE ONE PERSON ===");
    createAndSavePerson(function (err, savedPerson) {
      if (err) return fail(err);

      console.log(savedPerson);

      const peopleToCreate = [
        {
          name: "Mary",
          age: 24,
          favoriteFoods: ["burritos", "salad"]
        },
        {
          name: "Mary",
          age: 31,
          favoriteFoods: ["pasta", "burritos"]
        },
        {
          name: "Ahmed",
          age: 27,
          favoriteFoods: ["burritos", "hamburger"]
        },
        {
          name: "Sarah",
          age: 19,
          favoriteFoods: ["pizza", "ice cream"]
        }
      ];

      console.log("\n=== 2. CREATE MANY PEOPLE ===");
      createManyPeople(peopleToCreate, function (createErr, createdPeople) {
        if (createErr) return fail(createErr);

        console.log(createdPeople);

        console.log("\n=== 3. FIND PEOPLE BY NAME: Mary ===");
        findPeopleByName("Mary", function (findErr, marys) {
          if (findErr) return fail(findErr);

          console.log(marys);

          console.log("\n=== 4. FIND ONE PERSON BY FOOD: burritos ===");
          findOneByFood("burritos", function (foodErr, burritoPerson) {
            if (foodErr) return fail(foodErr);

            console.log(burritoPerson);

            console.log("\n=== 5. FIND PERSON BY ID ===");
            findPersonById(savedPerson._id, function (idErr, personById) {
              if (idErr) return fail(idErr);

              console.log(personById);

              console.log("\n=== 6. FIND, EDIT, PUSH hamburger, SAVE ===");
              findEditThenSave(
                savedPerson._id,
                function (editErr, editedPerson) {
                  if (editErr) return fail(editErr);

                  console.log(editedPerson);

                  console.log("\n=== 7. findOneAndUpdate Mary -> age 20 ===");
                  findAndUpdate("Mary", function (updateErr, updatedMary) {
                    if (updateErr) return fail(updateErr);

                    console.log(updatedMary);

                    console.log("\n=== 8. REMOVE PERSON BY ID ===");
                    removeById(
                      savedPerson._id,
                      function (removeErr, removedPerson) {
                        if (removeErr) return fail(removeErr);

                        console.log(removedPerson);

                        console.log("\n=== 9. REMOVE ALL PEOPLE NAMED Mary ===");
                        removeManyPeople(function (manyErr, result) {
                          if (manyErr) return fail(manyErr);

                          console.log(result);

                          // Mary documents were removed, but Ahmed still likes burritos,
                          // so the final chained query still has a meaningful result.
                          console.log(
                            "\n=== 10. CHAIN QUERY: burritos, sort, limit 2, hide age ==="
                          );
                          queryChain(function (chainErr, data) {
                            if (chainErr) return fail(chainErr);

                            console.log(data);
                            finish();
                          });
                        });
                      }
                    );
                  });
                }
              );
            });
          });
        });
      });
    });
  });
});
