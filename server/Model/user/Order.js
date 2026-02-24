import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Order = sequelize.define("Order", {
  id              : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id         : { type: DataTypes.UUID, allowNull: false },
  order_number    : { type: DataTypes.STRING, allowNull: false, unique: true },
  status          : { type: DataTypes.ENUM("Processing","Shipped","Delivered","Cancelled"), defaultValue: "Processing" },
  total_amount    : { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  delivery_address: { type: DataTypes.TEXT },
  address_id      : { type: DataTypes.UUID },
  payment_method  : { type: DataTypes.STRING, defaultValue: "UPI" },
}, { tableName: "orders", underscored: true, timestamps: true });