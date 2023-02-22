const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/api/category-routes');
const productRoutes = require('./routes/api/product-routes');
const tagRoutes = require('./routes/api/tag-routes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Set up the port
const PORT = process.env.PORT || 3001;

// Create the database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Define the associations between the models
const { Category, Product, Tag, ProductTag } = require('./models');
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });

// Sync the Sequelize models to the MySQL database
sequelize.sync({ force: false }).then(() => {
  // Seed the database with test data
  require('./db/seeds');
  // Start the server
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

// Use middleware to handle JSON request and response bodies
app.use(express.json());

// Use the category routes
app.use('/api/categories', categoryRoutes);

// Use the product routes
app.use('/api/products', productRoutes);

// Use the tag routes
app.use('/api/tags', tagRoutes);
