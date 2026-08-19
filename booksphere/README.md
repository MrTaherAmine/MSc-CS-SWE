# BookSphere — Social Book Recommendation Platform

BookSphere is a full-stack social book discovery and recommendation platform developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 1/7 — Project Setup and Database Configuration**

Phase 1 establishes:

- npm project structure;
- React frontend;
- Node.js + Express backend;
- MongoDB + Mongoose configuration;
- environment-variable management;
- initial User, Book, and Recommendation schemas;
- recommendation API foundation;
- health check endpoint.

## Architecture

```text
Browser
   |
   v
React + Vite client
   |
   | HTTP / JSON
   v
Node.js + Express API
   |
   v
Mongoose
   |
   v
MongoDB
```

## Installation

```bash
npm install
npm run install:all
cp server/.env.example server/.env
npm run dev
```

Set `MONGODB_URI` inside `server/.env` to either a local MongoDB instance or a MongoDB Atlas connection string.

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`  
Health: `http://localhost:5000/api/health`

## Optional Seed Data

```bash
npm run seed --prefix server
```

## Phase 1 API

```http
GET /api/health
GET /api/recommendations
POST /api/recommendations
```

## Data Model

- **User**: profile foundation for Phase 2 authentication.
- **Book**: book metadata and external-source identifiers.
- **Recommendation**: user/book references, recommendation text, rating, tags, visibility, engagement counters, timestamps.

The same repository will be extended through the remaining Lab Phases.

## Author

**Taher Amine ELHOUARI**  
GOMYCODE — 15-Month Software Engineering Program
