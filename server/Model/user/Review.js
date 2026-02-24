import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Review = sequelize.define("Review", {
  id        : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id   : { type: DataTypes.UUID, allowNull: false },
  product_id: { type: DataTypes.UUID, allowNull: false },
  rating    : { type: DataTypes.INTEGER, allowNull: false },
  comment   : { type: DataTypes.TEXT },
}, { tableName: "reviews", underscored: true, timestamps: true });