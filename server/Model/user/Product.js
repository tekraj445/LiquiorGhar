import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Product = sequelize.define("Product", {
  id            : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name          : { type: DataTypes.STRING, allowNull: false },
  brand         : { type: DataTypes.STRING },
  category      : { type: DataTypes.STRING },
  price         : { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  original_price: { type: DataTypes.DECIMAL(10, 2) },
  image         : { type: DataTypes.STRING, defaultValue: "🥃" },
  rating        : { type: DataTypes.DECIMAL(3, 1), defaultValue: 4.0 },
  reviews_count : { type: DataTypes.INTEGER, defaultValue: 0 },
  volume        : { type: DataTypes.STRING },
  in_stock      : { type: DataTypes.BOOLEAN, defaultValue: true },
  description   : { type: DataTypes.TEXT },
}, { tableName: "products", underscored: true, timestamps: true });