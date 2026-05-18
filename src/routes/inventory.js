const express = require("express");
const { inventoryItems, stockLedger, stockTransfers, stockCounts } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");
const { addAuditLog } = require("../services/audit");

const router = express.Router();

router.get("/items", allowRoles("ceo", "admin", "warehouse", "sales"), (req, res) => {
  const payload = inventoryItems.map((item) => ({
    ...item,
    stockStatus: item.qty <= item.reorderLevel ? "low" : "ok"
  }));
  res.json(payload);
});

router.get("/ledger", allowRoles("ceo", "admin", "warehouse", "accountant"), (req, res) => {
  res.json(stockLedger);
});

router.get("/transfers", allowRoles("ceo", "admin", "warehouse"), (req, res) => {
  res.json(stockTransfers);
});

router.get("/counts", allowRoles("ceo", "admin", "warehouse"), (req, res) => {
  res.json(stockCounts);
});

router.post("/items/:id/adjust", allowRoles("ceo", "admin", "warehouse"), (req, res) => {
  const id = Number(req.params.id);
  const { qty } = req.body || {};

  const item = inventoryItems.find((x) => x.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (typeof qty !== "number") {
    return res.status(400).json({ error: "qty (number) is required" });
  }

  const beforeQty = item.qty;
  item.qty = qty;
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "inventory.adjust", entityType: "inventory_item", entityId: item.id, module: "inventory", before: { qty: beforeQty }, after: { qty } });
  res.json({ ...item, stockStatus: item.qty <= item.reorderLevel ? "low" : "ok" });
});

module.exports = router;
