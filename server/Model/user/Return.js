import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Return = sequelize.define("Return", {
  id      : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  order_id: { type: DataTypes.UUID, allowNull: false },
  user_id : { type: DataTypes.UUID, allowNull: false },
  reason  : { type: DataTypes.TEXT },
  status  : { type: DataTypes.ENUM("Pending","Approved","Rejected"), defaultValue: "Pending" },
}, { tableName: "returns", underscored: true, timestamps: true });