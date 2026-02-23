import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/db.js';
import Order from './Order.js';

const Return = sequelize.define('Return', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: 'id' },
    onDelete: 'CASCADE',
    allowNull: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  reason: {
    type: DataTypes.TEXT,xdvdv
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Refunded', 'Rejected'),
    defaultValue: 'Pending',
  },
}, {
  tableName: 'returns',
  timestamps: true,
  underscored: true,
});

Return.belongsTo(Order, { foreignKey: 'order_id', as: 'order'   });
Order.hasMany(Return,   { foreignKey: 'order_id', as: 'returns' });

export default Return;