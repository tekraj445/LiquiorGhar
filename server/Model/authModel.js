import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Auth = sequelize.define("Auth", {
  id: {
    type        : DataTypes.UUID,          // ✅ INTEGER → UUID
    defaultValue: DataTypes.UUIDV4,        // ✅ auto generate
    primaryKey  : true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName : { type: DataTypes.STRING, allowNull: false },
  email    : { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  phone    : { type: DataTypes.STRING, allowNull: false },
  address  : { type: DataTypes.STRING, allowNull: false },
  dob      : { type: DataTypes.DATEONLY, allowNull: false },
  password : { type: DataTypes.STRING, allowNull: false },
  role     : { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
});

export default Auth;