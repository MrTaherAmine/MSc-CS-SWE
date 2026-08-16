const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS as the template engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS and other static assets.
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware:
// The application is available Monday-Friday, from 09:00 until before 17:00.
function workingHoursMiddleware(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ... Saturday = 6
  const hour = now.getHours();

  const isWorkingDay = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWorkingDay && isWorkingHour) {
    next();
    return;
  }

  res.status(403).render("closed", {
    title: "Office Closed"
  });
}

// Apply working-hours restriction to the website pages.
app.use(workingHoursMiddleware);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home"
  });
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "Our Services"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us"
  });
});

// Simple 404 fallback.
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Express app running at http://localhost:${PORT}`);
});
