import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/envConfig";

const sequelize = new Sequelize(envConfig.CONNECTION_STRING as string, {
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
