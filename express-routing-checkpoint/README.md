# Express (Routing) Checkpoint

Submission for:

**Advanced Back End Development : Express (Routing)**

## Requirements covered

- Express server
- Three pages:
  - Home
  - Our Services
  - Contact Us
- Navigation links on every page
- Custom middleware that checks working hours
- Application available only:
  - Monday to Friday
  - 09:00 to 17:00
- CSS styling
- EJS template engine used

## Routes

```text
GET /
GET /services
GET /contact
```

## Working Hours Middleware

The custom middleware checks:

```js
const day = now.getDay();
const hour = now.getHours();

const isWorkingDay = day >= 1 && day <= 5;
const isWorkingHour = hour >= 9 && hour < 17;
```

If the request is outside the allowed period, the server responds with:

```text
403 Forbidden
```

and renders the `closed.ejs` page.

## Project Structure

```text
express-routing-checkpoint/
├── public/
│   └── styles.css
├── views/
│   ├── closed.ejs
│   ├── contact.ejs
│   ├── home.ejs
│   └── services.ejs
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Run locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Testing the Working-Hours Restriction

Because the middleware uses the server's local system time, the pages are accessible only during the required period.

For testing outside working hours, you can temporarily change the middleware logic locally, but the submitted version keeps the checkpoint requirement intact.

## Author

Taher Amine ELHOUARI
