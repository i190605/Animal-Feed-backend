const express = require("express");
const { productionBatches, bomRecipes, materialScans, materialIssues, productionOutputs } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");
const { addAuditLog } = require("../services/audit");

const router = express.Router();

router.get("/batches", allowRoles("ceo", "admin", "production", "worker", "electrician"), (req, res) => {
  res.json(productionBatches);
});

router.get("/recipes", allowRoles("ceo", "admin", "production"), (req, res) => {
  res.json(bomRecipes);
});

router.get("/scans", allowRoles("ceo", "admin", "production", "worker"), (req, res) => {
  res.json(materialScans);
});

router.get("/issues", allowRoles("ceo", "admin", "production", "worker", "warehouse"), (req, res) => {
  res.json(materialIssues);
});

router.get("/outputs", allowRoles("ceo", "admin", "production", "worker"), (req, res) => {
  res.json(productionOutputs);
});

router.post("/batches", allowRoles("ceo", "admin", "production"), (req, res) => {
  const { formula, plannedBags, shift } = req.body || {};
  if (!formula || !plannedBags || !shift) {
    return res.status(400).json({ error: "formula, plannedBags, shift are required" });
  }

  const newBatch = {
    id: productionBatches.length + 1,
    batchNo: `BF-${200 + productionBatches.length + 1}`,
    formula,
    plannedBags,
    actualBags: 0,
    shift,
    status: "planned"
  };

  productionBatches.push(newBatch);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "production.batch.create", entityType: "production_batch", entityId: newBatch.id, module: "production", after: newBatch });
  res.status(201).json(newBatch);
});

router.post("/scans", allowRoles("ceo", "admin", "production", "worker"), (req, res) => {
  const { batchNo, sku, expectedQty, actualQty } = req.body || {};
  if (!batchNo || !sku || typeof expectedQty !== "number" || typeof actualQty !== "number") {
    return res.status(400).json({ error: "batchNo, sku, expectedQty(number), actualQty(number) are required" });
  }
  const record = {
    id: materialScans.length + 1,
    batchNo,
    sku,
    expectedQty,
    actualQty,
    variance: actualQty - expectedQty,
    scannedBy: req.user.username
  };
  materialScans.push(record);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "production.scan.record", entityType: "material_scan", entityId: record.id, module: "production", after: record });
  res.status(201).json(record);
});

module.exports = router;
