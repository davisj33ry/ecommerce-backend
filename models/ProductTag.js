const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define product_id column
    product_id: {
      type: DataTypes.INTEGER,
      // Reference the Product model's id
      references: {
        model: 'product',
        key: 'id'
      }
    },
    // Define tag_id column
    tag_id: {
      type: DataTypes.INTEGER,
      // Reference the Tag model's id
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;
