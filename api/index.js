const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRegisterRoute = require("./routes/userRegisterRoute");
const userLoginRoute = require("./routes/userLoginRoute");
const userProfile = require("./routes/userProfile");
const userLogout = require("./routes/userLogout");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
//setup express app
const app = express();
app.use(express.json());

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://airbandb-clone.onrender.com",
    // origin: "http://localhost:3000/",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header(
    "Access-Control-Allow-Origin",
    "https://airbandb-clone.onrender.com"
    // "http://localhost:3000/"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Include PUT in the allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

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

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
async function uploadToS3(path, originFileName, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originFileName.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + `.` + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${process.env.BUCKET}.s3.amazonaws.com/${newFilename}`;
}
//upload by link
const imageDownloader = require("image-downloader");
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = `photo` + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  console.log(url);
  res.json(url);
});

//upload from local

const photoMiddleware = multer({ dest: "/temp" });

app.post("/upload", photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
    console.log(url);
  }

  res.json(uploadedFiles);
});

const placesRoute = require("./routes/placesRoute");
app.use("/places", placesRoute);

const bookingRoute = require("./routes/bookingRoute");

app.use("/booking", bookingRoute);

app.listen(process.env.PORT || "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
