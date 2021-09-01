
var express = require('express');
var router = express.Router();

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

router.get('/', (req, res, next) => {
    res.send("Working");
});

module.exports = router;