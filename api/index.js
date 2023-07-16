const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRegisterRoute = require("./routes/userRegisterRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
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
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
