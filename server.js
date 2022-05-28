const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//config
dotenv.config({ path: "config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});
