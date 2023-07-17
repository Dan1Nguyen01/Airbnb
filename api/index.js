const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRegisterRoute = require("./routes/userRegisterRoute");
const userLoginRoute = require("./routes/userLoginRoute");
const userProfile = require("./routes/userProfile");
const userLogout = require("./routes/userLogout");
//setup express app
const app = express();
app.use(express.json());
// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);

mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGO_URL // { useNewParser: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connect fail, error: " + error);
  });
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.use("/register", userRegisterRoute);
app.use("/login", userLoginRoute);
app.use("/profile", userProfile);
app.use("/logout", userLogout);
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
