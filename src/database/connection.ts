import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/envConfig";
import User from "./models/user.model";
import Blog from "./models/blog.model";
import Tag from "./models/tag.model";

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

// connections
User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

Blog.belongsToMany(Tag, { through: "BlogTag" });
Tag.belongsToMany(Blog, { through: "BlogTag" });

export default sequelize;
