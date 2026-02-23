import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/db.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'In Transit', 'Shipped', 'Delivered', 'Cancelled'),
    defaultValue: 'Pending',
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true,
});

export default Order;