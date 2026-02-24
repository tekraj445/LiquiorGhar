import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Notification = sequelize.define("Notification", {
  id     : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "notifications", underscored: true, timestamps: true });