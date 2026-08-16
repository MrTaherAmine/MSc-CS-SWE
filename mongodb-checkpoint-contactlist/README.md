# MongoDB Checkpoint — Contact List CRUD

Submission for:

**Advanced Back End Development : MongoDB (Path to Certificate)**

## Objective

Practice MongoDB CRUD operations using:

- database creation;
- collection creation;
- document insertion;
- `find`;
- querying by ObjectId;
- comparison operators;
- regular expressions;
- update operations;
- delete operations.

## Required Database

```text
contact
```

## Required Collection

```text
contactlist
```

## Initial Data

| Last Name | First Name | Email | Age |
|---|---|---|---:|
| Ben | Moris | ben@gmail.com | 26 |
| Kefi | Seif | kefi@gmail.com | 15 |
| Emilie | brouge | emilie.b@gmail.com | 40 |
| Alex | brown | — | 4 |
| Denzel | Washington | — | 3 |

## Files

```text
mongodb-checkpoint-contactlist/
├── screenshots/
│   └── README.md
├── commands.md
├── mongodb-checkpoint.js
└── README.md
```

## Fastest Way to Execute Everything

Make sure MongoDB is running and `mongosh` is installed.

From the project directory:

```bash
mongosh < mongodb-checkpoint.js
```

The script automatically:

1. selects database `contact`;
2. recreates `contactlist`;
3. inserts the five required contacts;
4. displays all contacts;
5. finds Ben Moris using his generated ObjectId;
6. finds contacts aged over 18;
7. performs the age >18 + `ah` query;
8. changes Kefi Seif to Kefi Anis;
9. deletes contacts aged under 5;
10. displays the final list.

## Important Result for the `ah` Query

The assignment asks for contacts:

```text
age > 18 AND name contains "ah"
```

Using the exact supplied dataset, the result is empty.

The only name containing `ah` is:

```text
Washington
```

but Denzel Washington is age 3, so the contact fails the `age > 18` condition.

An empty MongoDB result for that query is therefore correct.

## Final State

After all operations, the collection should contain:

```text
Ben Moris       age 26
Kefi Anis       age 15
Emilie brouge   age 40
```

Alex brown and Denzel Washington are deleted because their ages are under 5.

## Screenshot Requirement

The checkpoint specifically requires screenshots.

See:

```text
screenshots/README.md
```

for the exact screenshot sequence.

Take the screenshots from your **real MongoDB shell / Compass environment** after running the commands. Add the images to the `screenshots/` folder before final submission.

## Manual Commands

If you prefer executing commands one-by-one, see:

```text
commands.md
```

## Author

Taher Amine ELHOUARI
