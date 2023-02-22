const mysql = require('mysql2');
const Sequelize = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Create Sequelize instance using the connection pool
const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: mysql,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
