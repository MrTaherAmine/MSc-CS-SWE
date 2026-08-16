# Checkpoint Next JS — Portfolio Website

Submission for **Front End Development: React with Next.js — Checkpoint Next JS**.

## What this project demonstrates

- Next.js project structure
- `pages/`, `components/`, `styles/`, and `public/` folders
- CSS Modules and global CSS
- Next.js `Image` component
- Page-based/file-based routing
- Multiple portfolio pages:
  - Home
  - About
  - Projects
  - Contact
- Reusable `Layout` component
- Server-side rendering with `getServerSideProps`
- Responsive design
- Deployment-ready Next.js scripts

## Server-side rendering

The home page exports:

```js
export async function getServerSideProps() {
  return {
    props: {
      renderedAt: new Date().toISOString()
    }
  };
}
```

This runs on the server for each request and passes the server-render time to the page.

## Project structure

```text
nextjs-portfolio-checkpoint/
├── components/
│   └── Layout.js
├── pages/
│   ├── _app.js
│   ├── about.js
│   ├── contact.js
│   ├── index.js
│   └── projects.js
├── public/
│   ├── profile.svg
│   ├── project-movie.svg
│   ├── project-redux.svg
│   └── project-task.svg
├── styles/
│   ├── globals.css
│   ├── Home.module.css
│   ├── Layout.module.css
│   └── Page.module.css
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Deployment

This project is ready to deploy to a platform that supports Next.js, such as Vercel.

Because the project demonstrates `getServerSideProps`, deploy it as a normal Next.js server application rather than a static HTML export.

## Author

Taher Amine ELHOUARI
