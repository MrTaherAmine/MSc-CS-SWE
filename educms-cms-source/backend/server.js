require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const port = process.env.PORT || 5000;

(async () => {
  await testConnection();
  app.listen(port, () => {
    console.log(`EduCMS API listening on http://localhost:${port}`);
  });
})();
