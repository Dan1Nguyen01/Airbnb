const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRegisterRoute = require("./routes/userRegisterRoute");
const userLoginRoute = require("./routes/userLoginRoute");
const userProfile = require("./routes/userProfile");
const userLogout = require("./routes/userLogout");
const uploadRoute = require("./routes/uploadRoute");
// const path = require('./build file/build')
//setup express app
const app = express();
app.use(express.json());

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://neon-pithivier-8e96ef.netlify.app/",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // Replace with your frontend origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Include PUT in the allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

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

app.use(express.static("./build file/build"));

app.use("/register", userRegisterRoute);
app.use("/login", userLoginRoute);
app.use("/profile", userProfile);
app.use("/logout", userLogout);
app.use("/upload-by-link", uploadRoute);

//upload from local
const localUploadRoute = require("./routes/localUploadRoute");
const multer = require("multer");
const photoMiddleware = multer({ dest: "uploads" });
app.use("/upload", photoMiddleware.array("photos", 100), localUploadRoute);

//
const placesRoute = require("./routes/placesRoute");
app.use("/places", placesRoute);

const bookingRoute = require("./routes/bookingRoute");
app.use("/booking", bookingRoute);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
