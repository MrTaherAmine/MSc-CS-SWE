# MongoDB Checkpoint Commands

These are the commands used for the checkpoint.

## 1. Use/Create the `contact` database

```javascript
use contact
```

## 2. Create `contactlist`

```javascript
db.createCollection("contactlist")
```

## 3. Insert the required documents

```javascript
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
])
```

## 4. Display all contacts

```javascript
db.contactlist.find()
```

or for easier reading:

```javascript
db.contactlist.find().pretty()
```

## 5. Display one person using the person's ID

First display the list and copy one `_id`, for example Ben Moris.

```javascript
db.contactlist.findOne({
  lastName: "Ben",
  firstName: "Moris"
})
```

Then query using the actual ObjectId shown by MongoDB:

```javascript
db.contactlist.findOne({
  _id: ObjectId("PASTE_THE_REAL_ID_HERE")
})
```

The provided automated script retrieves Ben's generated ID and performs this step automatically.

## 6. Display contacts with age > 18

```javascript
db.contactlist.find({
  age: { $gt: 18 }
})
```

Expected contacts:

- Ben Moris — 26
- Emilie brouge — 40

## 7. Display contacts with age > 18 and name containing `ah`

To interpret `name` as either first name or last name:

```javascript
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
})
```

With the exact data given in the checkpoint, this query returns **no documents**.

`Washington` contains `ah`, but Denzel Washington is only 3 years old, so he does not satisfy `age > 18`.

## 8. Change `Kefi Seif` to `Kefi Anis`

```javascript
db.contactlist.updateOne(
  {
    lastName: "Kefi",
    firstName: "Seif"
  },
  {
    $set: {
      firstName: "Anis"
    }
  }
)
```

Verify:

```javascript
db.contactlist.find({
  lastName: "Kefi"
})
```

## 9. Delete contacts aged under 5

```javascript
db.contactlist.deleteMany({
  age: { $lt: 5 }
})
```

This deletes:

- Alex brown — age 4
- Denzel Washington — age 3

## 10. Display the final contact list

```javascript
db.contactlist.find().pretty()
```

Expected remaining contacts:

- Ben Moris
- Kefi Anis
- Emilie brouge
