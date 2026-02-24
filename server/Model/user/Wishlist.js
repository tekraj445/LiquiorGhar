import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Wishlist = sequelize.define("Wishlist", {
  id        : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id   : { type: DataTypes.UUID, allowNull: false },
  product_id: { type: DataTypes.UUID, allowNull: false },
}, { tableName: "wishlists", underscored: true, timestamps: true });