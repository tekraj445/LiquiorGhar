import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Cart = sequelize.define("Cart", {
  id        : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id   : { type: DataTypes.UUID, allowNull: false },
  product_id: { type: DataTypes.UUID, allowNull: false },
  quantity  : { type: DataTypes.INTEGER, defaultValue: 1 },
}, { tableName: "carts", underscored: true, timestamps: true });