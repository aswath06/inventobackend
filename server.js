require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USERNAME,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    port: process.env.DEV_DB_PORT,
    dialectOptions: {
      ssl: {
        require: process.env.DEV_DB_SSL_REQUIRE === 'true',
        rejectUnauthorized: process.env.DEV_DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
