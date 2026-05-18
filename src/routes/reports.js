const express = require("express");
const { reportSummary, kpiSnapshots, auditDocuments } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");

const router = express.Router();

function toKey(prefix, value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${prefix}.${slug || "unknown"}`;
}

router.get("/summary", allowRoles("ceo", "admin", "accountant", "operations"), (req, res) => {
  const normalized = reportSummary.map((r) => ({
    ...r,
    periodKey: r.periodKey || toKey("period", r.period),
    metricKey: r.metricKey || toKey("metric", r.metric)
  }));
  res.json(normalized);
});

router.get("/exports", allowRoles("ceo", "admin", "accountant", "operations"), (req, res) => {
  res.json([
    { id: 1, type: "pdf", name: "production-variance.pdf", module: "production" },
    { id: 2, type: "excel", name: "stock-movement.xlsx", module: "inventory" },
    { id: 3, type: "pdf", name: "dispatch-summary.pdf", module: "dispatch" },
    { id: 4, type: "excel", name: "sales-summary.xlsx", module: "sales" }
  ]);
});

router.get("/kpi-snapshots", allowRoles("ceo", "admin", "accountant", "operations"), (req, res) => {
  res.json(kpiSnapshots);
});

router.get("/audit-documents", allowRoles("ceo", "admin", "accountant", "operations"), (req, res) => {
  res.json(auditDocuments);
});

module.exports = router;