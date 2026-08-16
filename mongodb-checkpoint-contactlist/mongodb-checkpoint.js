// MongoDB Checkpoint
// Run with mongosh:
// mongosh < mongodb-checkpoint.js
//
// This script:
// 1. Creates/uses database "contact"
// 2. Creates collection "contactlist"
// 3. Inserts the required contacts
// 4. Executes all requested CRUD operations

// Switch to the required database.
db = db.getSiblingDB("contact");

print("\n=== DATABASE ===");
print("Using database: " + db.getName());

// Start from a clean checkpoint collection so the script is repeatable.
db.contactlist.drop();

// Create the required collection explicitly.
db.createCollection("contactlist");

print("\n=== COLLECTION CREATED ===");
print("Collection: contactlist");

// Insert the required contacts.
db.contactlist.insertMany([
  {
    lastName: "Ben",
    firstName: "Moris",
    email: "ben@gmail.com",
    age: 26
  },
  {
    lastName: "Kefi",
    firstName: "Seif",
    email: "kefi@gmail.com",
    age: 15
  },
  {
    lastName: "Emilie",
    firstName: "brouge",
    email: "emilie.b@gmail.com",
    age: 40
  },
  {
    lastName: "Alex",
    firstName: "brown",
    age: 4
  },
  {
    lastName: "Denzel",
    firstName: "Washington",
    age: 3
  }
]);

print("\n=== 1. DISPLAY ALL CONTACTS ===");
db.contactlist.find().forEach(printjson);

// Display one contact using his ObjectId.
// We first retrieve Ben Moris, then query again using his _id.
const ben = db.contactlist.findOne({
  lastName: "Ben",
  firstName: "Moris"
});

print("\n=== 2. DISPLAY ONE PERSON USING HIS ID ===");
print("Selected ObjectId: " + ben._id);
db.contactlist.find({ _id: ben._id }).forEach(printjson);

print("\n=== 3. CONTACTS WITH AGE > 18 ===");
db.contactlist.find({
  age: { $gt: 18 }
}).forEach(printjson);

print('\n=== 4. CONTACTS WITH AGE > 18 AND NAME CONTAINING "ah" ===');
// "name" is interpreted as either firstName or lastName.
// Case-insensitive regex is used.
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
}).forEach(printjson);

// Note:
// With the exact provided dataset, this query may return no records because
// Washington contains "ah" but that contact is age 3.
// That is a valid result for the requested condition.

print('\n=== 5. CHANGE "KEFI SEIF" TO "KEFI ANIS" ===');
const updateResult = db.contactlist.updateOne(
  {
    lastName: "Kefi",
    firstName: "Seif"
  },
  {
    $set: {
      firstName: "Anis"
    }
  }
);

printjson(updateResult);

print("\nUpdated Kefi contact:");
db.contactlist.find({
  lastName: "Kefi"
}).forEach(printjson);

print("\n=== 6. DELETE CONTACTS AGED UNDER 5 ===");
const deleteResult = db.contactlist.deleteMany({
  age: { $lt: 5 }
});

printjson(deleteResult);

print("\n=== 7. FINAL CONTACT LIST ===");
db.contactlist.find().forEach(printjson);

print("\n=== CHECKPOINT COMPLETE ===");
