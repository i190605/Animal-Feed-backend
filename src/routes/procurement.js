const express = require("express");
const { purchaseOrders, vendors, vendorPriceHistory, purchaseRequisitions, goodsReceiptNotes, invoiceMatching, poApprovals, vendorOrders } = require("../data/mockData");
const { allowRoles, requireHierarchy } = require("../middleware/auth");
const { addAuditLog } = require("../services/audit");

const router = express.Router();

router.get("/purchase-orders", allowRoles("ceo", "admin", "accountant", "warehouse"), (req, res) => {
  res.json(purchaseOrders);
});

router.get("/vendors", allowRoles("ceo", "admin", "accountant", "warehouse"), (req, res) => {
  res.json(vendors);
});

router.get("/vendors/:id/prices", allowRoles("ceo", "admin", "accountant", "warehouse"), (req, res) => {
  const vendorId = Number(req.params.id);
  res.json(vendorPriceHistory.filter((p) => p.vendorId === vendorId));
});

router.get("/requisitions", allowRoles("ceo", "admin", "warehouse"), (req, res) => {
  res.json(purchaseRequisitions);
});

router.get("/grn", allowRoles("ceo", "admin", "accountant", "warehouse"), (req, res) => {
  res.json(goodsReceiptNotes);
});

router.get("/matching", allowRoles("ceo", "admin", "accountant"), (req, res) => {
  res.json(invoiceMatching);
});

router.get("/approvals", allowRoles("ceo", "admin", "accountant"), (req, res) => {
  res.json(poApprovals);
});

router.get("/vendor-orders", allowRoles("ceo", "admin", "accountant", "warehouse"), (req, res) => {
  res.json(vendorOrders);
});

router.post("/purchase-orders", allowRoles("ceo", "admin"), requireHierarchy(90), (req, res) => {
  const { vendor, material, qtyTons } = req.body || {};
  if (!vendor || !material || !qtyTons) {
    return res.status(400).json({ error: "vendor, material, qtyTons are required" });
  }

  const newPo = {
    id: purchaseOrders.length + 1,
    poNo: `PO-${1000 + purchaseOrders.length + 1}`,
    vendor,
    material,
    qtyTons,
    status: "pending",
    createdBy: req.user.username
  };

  purchaseOrders.push(newPo);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "procurement.po.create", entityType: "purchase_order", entityId: newPo.id, module: "procurement", after: newPo });
  res.status(201).json(newPo);
});

router.post("/requisitions", allowRoles("ceo", "admin", "warehouse"), (req, res) => {
  const { material, qtyTons } = req.body || {};
  if (!material || !qtyTons) return res.status(400).json({ error: "material, qtyTons are required" });
  const reqn = { id: purchaseRequisitions.length + 1, reqNo: `PR-${1000 + purchaseRequisitions.length + 1}`, material, qtyTons, status: "requested", requestedBy: req.user.username };
  purchaseRequisitions.push(reqn);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "procurement.requisition.create", entityType: "purchase_requisition", entityId: reqn.id, module: "procurement", after: reqn });
  res.status(201).json(reqn);
});

router.post("/purchase-orders/:poNo/approve", allowRoles("ceo", "admin"), requireHierarchy(90), (req, res) => {
  const po = purchaseOrders.find((p) => p.poNo === req.params.poNo);
  if (!po) return res.status(404).json({ error: "PO not found" });
  po.status = "approved";
  const approval = { id: poApprovals.length + 1, poNo: po.poNo, level: "manager", approvedBy: req.user.username, status: "approved", approvedAt: new Date().toISOString() };
  poApprovals.push(approval);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "procurement.po.approve", entityType: "purchase_order", entityId: po.id, module: "procurement", after: approval });
  res.json({ po, approval });
});

router.post("/vendor-orders", allowRoles("ceo", "admin", "accountant"), (req, res) => {
  const { poNo, vendor } = req.body || {};
  if (!poNo || !vendor) return res.status(400).json({ error: "poNo, vendor are required" });
  const issue = { id: vendorOrders.length + 1, poNo, vendor, issuedBy: req.user.username, issuedAt: new Date().toISOString(), status: "issued" };
  vendorOrders.push(issue);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "procurement.vendor.issue", entityType: "vendor_order", entityId: issue.id, module: "procurement", after: issue });
  res.status(201).json(issue);
});

module.exports = router;
