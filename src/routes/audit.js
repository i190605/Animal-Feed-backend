const express = require("express");
const { allowRoles } = require("../middleware/auth");
const { listAuditLogs } = require("../services/audit");

const router = express.Router();

router.get("/", allowRoles("ceo", "admin"), (req, res) => {
  res.json(listAuditLogs());
});

module.exports = router;
