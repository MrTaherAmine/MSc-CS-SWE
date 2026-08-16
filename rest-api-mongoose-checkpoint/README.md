# Checkpoint REST API

Submission for:

**Distributed Systems with High-Level System Design : REST API (With Postman Certification)**

## Objective

Create a REST API with:

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- four CRUD routes
- Postman testing

The JavaScript source is commented throughout as requested by the checkpoint.

## Project Structure

```text
rest-api-mongoose-checkpoint/
├── config/
│   └── db.js
├── models/
│   └── User.js
├── postman/
│   └── Checkpoint-REST-API.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── POSTMAN-TESTING.md
├── README.md
└── Server.js
```

## Step 1 - Install

```bash
npm install
```

## Step 2 - Configure `.env`

Copy:

```text
.env.example
```

to:

```text
.env
```

For a local MongoDB instance:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/rest_api_checkpoint
```

You can replace `MONGO_URI` with a MongoDB Atlas connection URI.

The real `.env` is ignored by Git so database credentials are not uploaded.

## Step 3 - Start the Server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## User Model

`models/User.js` defines a Mongoose schema with:

```text
name  - String, required
email - String, required, unique
age   - Number, optional
```

## Required Routes

### GET - Return all users

```text
GET /users
```

Mongoose method:

```text
User.find()
```

### POST - Add a new user

```text
POST /users
```

Mongoose method:

```text
User.create()
```

Example JSON:

```json
{
  "name": "Taher Amine",
  "email": "taher@example.com",
  "age": 25
}
```

### PUT - Edit a user by ID

```text
PUT /users/:id
```

Mongoose method:

```text
User.findByIdAndUpdate()
```

The route uses:

```js
{
  new: true,
  runValidators: true
}
```

so the response returns the updated document and applies schema validation.

### DELETE - Remove a user by ID

```text
DELETE /users/:id
```

Mongoose method:

```text
User.findByIdAndDelete()
```

## Postman

A complete collection is provided:

```text
postman/Checkpoint-REST-API.postman_collection.json
```

Import it into Postman and execute all four requests.

The POST request automatically captures the created user's `_id` into the
`userId` collection variable, so the same ID can immediately be used by the
PUT and DELETE requests.

See:

```text
POSTMAN-TESTING.md
```

## JavaScript Syntax Check

```bash
npm run check
```

## Suggested GitHub Repository

```text
rest-api-mongoose-checkpoint
```

## Security Note

Never commit your real MongoDB Atlas credentials.

The project includes:

```text
.env.example
```

for configuration examples and ignores:

```text
.env
```

through `.gitignore`.

## Author

Taher Amine ELHOUARI
