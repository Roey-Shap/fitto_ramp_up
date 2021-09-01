var express = require('express');
const app = express();
var router = express.Router();
app.use(express.json);
const fs = require('fs');

// vvv from https://www.youtube.com/watch?v=KoWTJ5XiYm4&ab_channel=webnaturesolutions
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

const multer = require('multer');
const upload = multer();

const profilePath     = '/profile';
const profileDataPath = '/profile/data';

//let profilePicture = require(`${__dirname}/../../JSONfiles/${currentProfilePictureName}`);
/*
async function ReadFiles() {
  return ( fs.readFile('./JSONfiles/itemsData.json', async (err, data) => {
      if (err) throw err;
      let itemsObject = await JSON.parse(data);
      return(itemsObject);
  })
  );
}
*/
// ============= GET ======================
//If this page runs, we can use Node to efficiently access the data
router.get('/', async (req, res, next) => {
  fs.readFile('./JSONfiles/itemsData.json', (err, data) => {
      if (err) throw err;

      res.send(data.toString());
  });
});

// if there's no specific route set up for it, express will go to this line to look for the file
//router.use('/profile', express.static('JSONfiles'));

// Sending profile data to the frontend
router.get(profileDataPath, async (req, res, next) => {
  fs.readFile('./JSONfiles/profileData.json', (err, data) => {
      if (err) throw err;

      res.send(data.toString());
  })
});

// if there's no specific route set up for it, express will go to this line to look for the file
//router.use('/profile', express.static('JSONfiles'));


router.get('/profile', async (req, res, next) => {
  //res.json(profilePic);
  
  fs.readFile('./JSONfiles/profilePicture.json', (err, data) => {
      if (err) throw err;
      //itemsObject = JSON.parse(data);
        //console.log(data.toString());
      res.send(data.toString());
      //res.sendFile('./JSONfiles/profilePicture.json');
  });
  

  //let image = `<img src='JSONfiles/profilePicture.jpeg'/>`;
  //res.send(image);
});

// ================ POST ===================
//Respond to React requesting to post here
// for item data
router.post('/', async (req, res, next) => {
  fs.writeFile('./JSONfiles/itemsData.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) { console.log(err) } 
    else { console.log ('File written') };
  });
});

// for profile data
router.post(profileDataPath, async (req, res, next) => {
  fs.writeFile('./JSONfiles/profileData.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) { console.log(err) } 
    else { console.log ('File written') };
  });
});

// for profile picture
router.post(profilePath, upload.single("file"), async (req, res, next) => {
  // req.file, holds file, req.body will hold the text fields, if there were any

  const { file } = req;
  //console.log(file);
  const ext = file.detectedFileExtension;
  
  if (ext != ".jpg" && ext != ".png" && ext != ".jpeg" && ext != ".ico") {
    next(new Error(`Custom error: Invalid File Type: .${ext}`));
  } else {
    await fs.writeFile(`${__dirname}/../../JSONfiles/profilePicture.json`, JSON.stringify(file, null, 2), (err) => {
      if (err) { console.log(err) } 
    });

    await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../../JSONfiles/profilePicture${ext}`));
    console.log("File successfully saved");
  }
});

module.exports = router;





//Uses the environment variable of the machine
//if we don't have one, then use the arbitrary value 9000
//const port = process.env.PORT || 3002;
//app.listen(port, () => console.log(`Listening on port ${port}`));




/*
const { createClient } = require('@typeform/api-client');

//get a new instance of a Typeform object
const typeformAPI = createClient({ token: ''});
*/

/*
const express = require("express");
const router = express.Router();
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
*/


