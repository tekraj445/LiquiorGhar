import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "xoro",
  "postgres",
  "Rajanbikram@123",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
);

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};