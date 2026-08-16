# Checkpoint Mongoose & NodeJS VS MongoDB

Submission for:

**NoSQL Cloud Datastores : Mongoose & MongoDB vS NodeJS**

## Important compatibility choice

This checkpoint explicitly asks for older callback-style Mongoose APIs such as:

```text
document.save(callback)
findByIdAndRemove()
Model.remove()
```

and the connection options:

```js
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

The project therefore intentionally pins **Mongoose 5.13.23**, where these
assignment-required APIs are available.

Do not automatically upgrade Mongoose before the checkpoint is graded, because
newer major releases changed or removed several of these legacy APIs.

## Requirements implemented

The code is fully commented and includes:

- MongoDB Atlas URI in `.env` as `MONGO_URI`
- Mongoose connection
- `Person` schema
- required `name`
- numeric `age`
- `favoriteFoods: [String]`
- create and save one Person
- `Model.create()` for many people
- `Model.find()`
- `Model.findOne()`
- `Model.findById()`
- classic Find -> Edit -> Save
- `findOneAndUpdate(..., { new: true })`
- `findByIdAndRemove()`
- `Model.remove({ name: "Mary" })`
- chained `.find().sort().limit().select().exec()`

## Files

```text
mongoose-nodejs-mongodb-checkpoint/
├── .env.example
├── .gitignore
├── demo.js
├── myApp.js
├── package.json
└── README.md
```

## 1. Install packages

```bash
npm install
```

The package includes both MongoDB and Mongoose as requested.

## 2. Configure MongoDB Atlas

Create a MongoDB Atlas database/cluster and copy your connection URI.

Copy:

```text
.env.example
```

to:

```text
.env
```

Then set:

```env
MONGO_URI="mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/people_checkpoint?retryWrites=true&w=majority"
```

There must be no spaces around the `=` character.

### Security

Never upload your real `.env` file.

The repository's `.gitignore` already excludes it.

## 3. Person prototype

The schema is:

```js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  favoriteFoods: {
    type: [String],
    default: []
  }
});
```

## 4. Checkpoint functions

All required operations are in:

```text
myApp.js
```

### Create and save

```js
createAndSavePerson(done)
```

### Create many

```js
createManyPeople(arrayOfPeople, done)
```

### Find by name

```js
findPeopleByName(personName, done)
```

### Find one by favorite food

```js
findOneByFood(food, done)
```

### Find by ID

```js
findPersonById(personId, done)
```

### Find, edit and save

```js
findEditThenSave(personId, done)
```

This pushes:

```text
hamburger
```

into `favoriteFoods`.

### findOneAndUpdate

```js
findAndUpdate(personName, done)
```

Sets age to:

```text
20
```

and uses:

```js
{ new: true }
```

### Remove by ID

```js
removeById(personId, done)
```

Uses the method specifically requested by the checkpoint:

```js
findByIdAndRemove()
```

### Remove all Mary records

```js
removeManyPeople(done)
```

Uses:

```js
Person.remove({ name: "Mary" }, ...)
```

as explicitly requested.

### Chained query

```js
queryChain(done)
```

Equivalent to:

```js
Person.find({ favoriteFoods: "burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec(done);
```

## 5. Run the complete demonstration

After adding `MONGO_URI`:

```bash
npm start
```

The demo:

1. clears the checkpoint Person collection;
2. creates one person;
3. creates several people;
4. searches by name;
5. searches by food;
6. searches by `_id`;
7. performs Find -> Edit -> Save;
8. updates age with `findOneAndUpdate`;
9. removes a document by ID;
10. removes all people named Mary;
11. runs the chained burrito query.

## Syntax check

You can verify the JavaScript syntax without connecting to MongoDB:

```bash
npm run check
```

## GitHub repository name

Suggested:

```text
mongoose-nodejs-mongodb-checkpoint
```

## Author

Taher Amine ELHOUARI
