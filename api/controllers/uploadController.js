const express = require("express");
const download = require("image-downloader");
const multer = require("multer");
const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const destPath =
    "C:/Users/danng/Desktop/Portfolio/Airbnb/api/uploads/" + newName;

  try {
    await download.image({
      url: link,
      dest: destPath,
    });

    console.log("Image saved successfully at:", destPath);
    res.json(newName);
  } catch (error) {
    console.error("Error while downloading/saving the image:", error);
    res.status(500).json({ error: "Failed to save the image." });
  }
};

const fs = require("fs");
const localUpload = (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
};

module.exports = { uploadByLink, localUpload };
