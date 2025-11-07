require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes under /api
app.use('/api', routes);

// Root route
app.get('/', (req, res) => res.json({ message: '✅ Inventory API running successfully' }));

// Start server with database connection
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on:`);
      console.log(`   Local:   http://localhost:${PORT}`);
      console.log(`   Network: http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();
