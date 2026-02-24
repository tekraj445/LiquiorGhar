import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const SupportTicket = sequelize.define("SupportTicket", {
  id     : { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  status : { type: DataTypes.ENUM("Open","InProgress","Closed"), defaultValue: "Open" },
}, { tableName: "support_tickets", underscored: true, timestamps: true });