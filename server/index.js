const express = require("express");
const multer = require("multer");
const cors = require("cors");
const File = require("./model/file");
const PORT = 3000;
const mongoose = require("mongoose");

const app = express();

//midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/file-upload-MERN")
  .then(() => console.log(`connected to mongoDB`))
  .catch((error) => console.log("connection error", error));

//multer setup for storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //upload is a middleware for fileupload

//upload files
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({
      orgName: req.file.originalname,
      fileData: req.file.buffer,
      mimeType: req.file.mimetype,
      uploadDate: Date.now(),
    });
    await newFile.save();
    res.status(200).json({ MessagePort: "file uploaded to database" });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

//view files
app.get("/file/name/:name", async (req, res) => {
  try {
    const file = await File.findOne({ orgName: req.params.name });
    if (!file) return res.status(404).json({ message: "no such file" });

    res.set({
      "content-Type": file.mimeType,
      "Content-Disposition": "inline", // to get back the file in its original form instead of buffer
    });
    res.send(file.fileData);
  } catch (error) {
    return res.status(500).json({ message: "not found", error });
  }
});

app.listen(PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});
