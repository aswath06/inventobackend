require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const routes = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Inventory API running successfully' });
});
const sequelize = new Sequelize(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USERNAME,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT || 'postgres',
    port: process.env.DEV_DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: process.env.DEV_DB_SSL_REQUIRE === 'true',
        rejectUnauthorized: process.env.DEV_DB_SSL_REJECT_UNAUTHORIZED === 'true',
      },
    },
    logging: false,
  }
);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    app.listen(PORT, HOST, () => {
      console.log(`Server running on:`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();
