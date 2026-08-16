# Screenshot Evidence Checklist

The checkpoint explicitly says:

> You have to save your work as screenshots.

Do **not** submit fake/generated screenshots. Run the commands in MongoDB and capture the real results.

Recommended screenshots:

## Screenshot 01 — Database + collection + inserted documents

Capture:

```javascript
show dbs
use contact
show collections
db.contactlist.find().pretty()
```

The screenshot should visibly show:

- database `contact`
- collection `contactlist`
- the five original documents

Suggested filename:

```text
01-database-collection-insert.png
```

## Screenshot 02 — Find one contact by ObjectId

Run:

```javascript
db.contactlist.findOne({
  lastName: "Ben",
  firstName: "Moris"
})
```

Copy the displayed ObjectId and run:

```javascript
db.contactlist.findOne({
  _id: ObjectId("YOUR_REAL_OBJECT_ID")
})
```

Suggested filename:

```text
02-find-contact-by-id.png
```

## Screenshot 03 — Age greater than 18

```javascript
db.contactlist.find({
  age: { $gt: 18 }
}).pretty()
```

Suggested filename:

```text
03-age-over-18.png
```

## Screenshot 04 — Age > 18 AND name containing `ah`

```javascript
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
}).pretty()
```

With the exact provided dataset, an empty result is expected.

Suggested filename:

```text
04-age-over-18-name-ah.png
```

## Screenshot 05 — Update Kefi Seif → Kefi Anis

Run:

```javascript
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
)
```

Then:

```javascript
db.contactlist.find({
  lastName: "Kefi"
}).pretty()
```

Suggested filename:

```text
05-update-kefi-anis.png
```

## Screenshot 06 — Delete age under 5

```javascript
db.contactlist.deleteMany({
  age: { $lt: 5 }
})
```

Suggested filename:

```text
06-delete-under-5.png
```

## Screenshot 07 — Final list

```javascript
db.contactlist.find().pretty()
```

Expected final records:

- Ben Moris
- Kefi Anis
- Emilie brouge

Suggested filename:

```text
07-final-contact-list.png
```

After taking the screenshots, copy them into this `screenshots/` folder before pushing the repository to GitHub.
