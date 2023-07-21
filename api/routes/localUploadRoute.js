const express = require("express");
const router = express.Router();
const { localUpload } = require("../controllers/uploadController");
router.post("/", localUpload);

module.exports = router;
