import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/envConfig";

// initializing sequelize
const sequelize = new Sequelize({
  database: envConfig.DB_NAME,
  dialect: "mysql",
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  host: envConfig.DB_HOST,
  port: Number(envConfig.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("synced !!!");
});

export default sequelize;
