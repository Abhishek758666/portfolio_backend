import bcrypt from "bcrypt";
import User from "../database/models/user.model";

const adminSeeder = async (): Promise<void> => {
  try {
    const [data] = await User.findAll({
      where: {
        email: "aabhik81@gmail.com",
      },
    });

    if (!data) {
      await User.create({
        email: "aabhik81@gmail.com",
        userImage:
          "https://abhishekhati.com.np/_next/image?url=%2Fme.png&w=828&q=75",
        password: bcrypt.hashSync("Password@111", 10),
        username: "abhishek",
        role: "admin",
      });
      console.log("admin seeded successfully");
    } else {
      console.log("admin already exist");
    }
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export default adminSeeder;
