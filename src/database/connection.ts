import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/envConfig";

// initializing sequelize
const URI =
  "postgresql://postgres:BC30UM4gOwgCC4jS@db.zjyeeksmkslyfsinjkkr.supabase.co:5432/postgres";

const sequelize = new Sequelize(URI, {
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
