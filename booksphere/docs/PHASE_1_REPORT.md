# Phase 1 Report — Project Setup and Database Configuration

For Phase 1, I created the initial **BookSphere – Social Book Recommendation Platform** project structure as a full-stack JavaScript application.

I initialized the project with npm and separated the application into a React/Vite frontend (`client`) and a Node.js/Express backend (`server`). I configured development scripts so both parts can be run independently or together.

For the database layer, I configured **MongoDB with Mongoose**. The connection string is managed through environment variables using a `.env` file, with `.env.example` provided so credentials are not committed to GitHub. The backend exposes a `/api/health` endpoint that reports the API and MongoDB connection status.

I created the initial MongoDB schemas needed for the platform:

- **User** — reader-profile foundation for the authentication phase.
- **Book** — stores book metadata and external source identifiers.
- **Recommendation** — stores the recommended book, recommendation text, rating, tags, visibility, and engagement counters.

The Recommendation model uses references to Book and User documents and includes indexes for recent recommendations, user history, book activity, and public-feed queries.

I also implemented basic GET and POST recommendation API routes and added an optional seed script to verify the database configuration and schema.

This structure establishes the technical foundation for the next lab phases while keeping the project modular and scalable.
