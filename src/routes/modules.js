const express = require("express");
const { modules } = require("../data/mockData");

const router = express.Router();

function toKey(prefix, value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${prefix}.${slug || "unknown"}`;
}

router.get("/", (req, res) => {
  const normalized = modules.map((m) => ({
    ...m,
    nameKey: m.nameKey || toKey("module", m.name)
  }));
  res.json(normalized);
});

module.exports = router;
