import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const User = sequelize.define("User", {
  id      : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name    : { type: DataTypes.STRING, allowNull: false },
  email   : { type: DataTypes.STRING, allowNull: false, unique: true },
  phone   : { type: DataTypes.STRING },
  dob     : { type: DataTypes.DATEONLY },
  password: { type: DataTypes.STRING, allowNull: false },
  plan    : { type: DataTypes.STRING, defaultValue: "Premium Member" },
}, { tableName: "users", underscored: true, timestamps: true });