const app = require("./app");
const { configurePassport } = require("./config/passport");

function loadRequiredEnvironment() {
  if (!process.env.JWT_SECRET) {
    console.error("Missing JWT_SECRET environment variable.");
    process.exit(1);
  }
}

loadRequiredEnvironment();
configurePassport();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Secure Task Manager API running at http://localhost:${PORT}`);
});
