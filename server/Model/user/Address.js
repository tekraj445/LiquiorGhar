import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Address = sequelize.define("Address", {
  id        : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id   : { type: DataTypes.UUID, allowNull: false },
  label     : { type: DataTypes.STRING, allowNull: false },
  address   : { type: DataTypes.TEXT, allowNull: false },
  is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "addresses", underscored: true, timestamps: true });