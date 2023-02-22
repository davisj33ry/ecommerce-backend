const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// Connect to the database using mysql2
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
(async () => {
  try {
    await pool.query('SELECT 1 + 1');
    console.log('Connected to MySQL database');
  } catch (err) {
    console.error('Failed to connect to MySQL database:', err);
  }
})();

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = {
  pool,
  sequelize,
};
