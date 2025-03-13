import app from "./src/app";
import { envConfig } from "./src/config/envConfig";

const port = envConfig.PORT || 4001;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
