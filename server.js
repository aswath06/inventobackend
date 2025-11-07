require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const routes = require('./routes'); // your routes/index.js

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: '✅ Inventory API running successfully' });
});

// Sequelize setup using DEV database (Render)
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
          ? true
          : false,
      },
    },
    logging: false, // optional: disable SQL logs
  }
);

// Start server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on:`);
      console.log(`   Local:   http://localhost:${PORT}`);
      console.log(`   Network: http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();
