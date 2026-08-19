# NovaCart — MERN E-Commerce Store

A full-stack e-commerce application built as part of the **15-Month Software Engineering Program**.

**Author:** Taher Amine ELHOUARI  
**Stack:** MongoDB · Express.js · React · Node.js · Mongoose · JWT · Vite

## Features

- Responsive React storefront
- Product catalogue
- Search and category filtering
- Product detail pages
- Shopping cart with quantity controls
- Cart persistence with localStorage
- Registration and login API
- JWT-based authentication
- Checkout workflow
- Order creation API
- MongoDB/Mongoose persistence when configured
- Demo fallback mode when MongoDB is unavailable
- Express REST API

## Project Structure

```text
novacart-mern-ecommerce/
├── api/
│   └── index.js
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── server.js
└── vite.config.js
```

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Application/database health |
| GET | `/api/products` | List products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/orders` | Create an order |

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and provide your own values if you want MongoDB persistence.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=3000
```

The project can still demonstrate the main workflow in **demo mode** without MongoDB.

### 3. Start the React development server

```bash
npm run dev
```

### 4. Production build

```bash
npm run build
npm start
```

The Express server serves the compiled React application and the API.

## Clean Code Approach

The project separates UI components, pages, state management, API logic and backend concerns. Components are reusable, routes are explicit, configuration is stored in environment variables, and the application avoids committing credentials or generated dependencies.

## Academic Context

This repository was created for the **Full E-Commerce Website Project** checkpoint in the 15-Month Software Engineering Program. It demonstrates front-end development, back-end API design, MongoDB integration, authentication, cart management, checkout logic and source-control-ready project organization.

## Author

**Taher Amine ELHOUARI**
