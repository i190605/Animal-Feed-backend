const express = require("express");
const { roles } = require("../data/mockData");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(roles);
});

module.exports = router;
