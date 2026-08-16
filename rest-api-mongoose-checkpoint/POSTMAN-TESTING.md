# Postman Testing Guide

The checkpoint requires testing each route with Postman.

A ready-to-import Postman collection is included:

```text
postman/Checkpoint-REST-API.postman_collection.json
```

## Import

1. Open Postman.
2. Click **Import**.
3. Select `Checkpoint-REST-API.postman_collection.json`.
4. Start the API with `npm start`.
5. Run the requests in the order below.

## 1. POST - Add New User

```text
POST http://localhost:3000/users
```

Body:

```json
{
  "name": "Taher Amine",
  "email": "taher@example.com",
  "age": 25
}
```

The included Postman test automatically stores the returned MongoDB `_id`
inside the collection variable:

```text
userId
```

## 2. GET - Return All Users

```text
GET http://localhost:3000/users
```

## 3. PUT - Edit User By ID

```text
PUT http://localhost:3000/users/{{userId}}
```

Example body:

```json
{
  "name": "Taher Amine Updated",
  "age": 26
}
```

## 4. DELETE - Remove User By ID

```text
DELETE http://localhost:3000/users/{{userId}}
```

## Suggested evidence

If your instructor asks for proof of Postman testing, capture one screenshot
for each request showing:

- HTTP method and URL
- request body where applicable
- response body
- response status code
