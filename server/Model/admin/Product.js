import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/db.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  original_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
  reviews_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  volume: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  in_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true, // maps createdAt -> created_at, updatedAt -> updated_at
});

export default Product;