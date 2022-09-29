const express = require('express')
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
const imageModel = require("./models");

app.use(bodyParser.urlencoded(
  { extended:true }
))
// MongoDB Connect;
mongoose
  .connect(
    "mongodb://localhost:27017/imageUpload",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  var img = fs.readFileSync(req.file.path);
  // res.json({})
  const saveImage = imageModel({
    img: {
      data: fs.readFileSync("images/" + req.file.filename),
      contentType: "image/png",
    },
  })

  saveImage
  .save()
  .then((res) => {
    console.log("image is saved");
  })
  .catch((err) => {
    console.log(err, "error has occur");
  });
  res.send('image is saved')

  console.log(img)
})

// For read File;
app.get("/show",async(req,res)=>{
  const allData = await imageModel.find()
  res.json(allData);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
