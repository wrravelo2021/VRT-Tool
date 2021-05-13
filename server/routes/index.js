var path = require("path");
var router = require("express").Router();
var testRouter = require("./test");

// API
router.use("/api/tests", testRouter);

// WEBAPP
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
