import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/db.js';
import Order   from './Order.js';
import Product from './Product.js';

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: 'id' },
    onDelete: 'CASCADE',
  },
  product_id: {
    type: DataTypes.UUID,
    references: { model: Product, key: 'id' },
    onDelete: 'SET NULL',
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'order_items',
  timestamps: false,
});

Order.hasMany(OrderItem,     { foreignKey: 'order_id',   as: 'items'   });
OrderItem.belongsTo(Order,   { foreignKey: 'order_id'                   });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem,   { foreignKey: 'product_id'                 });

export default OrderItem;