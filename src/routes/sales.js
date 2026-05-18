const express = require("express");
const { salesInvoices, cashierShifts, salesReturns, receivables, documentAttachments, distributionOrders, outletTransfers, posSales, invoicePostings, journalEntries } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");
const { addAuditLog } = require("../services/audit");

const router = express.Router();

router.get("/invoices", allowRoles("ceo", "admin", "accountant", "sales"), (req, res) => {
  res.json(salesInvoices);
});

router.get("/cashier-shifts", allowRoles("ceo", "admin", "sales", "accountant"), (req, res) => {
  res.json(cashierShifts);
});

router.get("/returns", allowRoles("ceo", "admin", "sales", "accountant"), (req, res) => {
  res.json(salesReturns);
});

router.get("/receivables", allowRoles("ceo", "admin", "sales", "accountant"), (req, res) => {
  res.json(receivables);
});

router.get("/attachments", allowRoles("ceo", "admin", "sales", "accountant"), (req, res) => {
  res.json(documentAttachments.filter((d) => d.module === "sales"));
});

router.get("/distribution-orders", allowRoles("ceo", "admin", "sales", "operations"), (req, res) => {
  res.json(distributionOrders);
});

router.get("/outlet-transfers", allowRoles("ceo", "admin", "sales", "warehouse"), (req, res) => {
  res.json(outletTransfers);
});

router.get("/pos-sales", allowRoles("ceo", "admin", "sales", "accountant"), (req, res) => {
  res.json(posSales);
});

router.get("/invoice-postings", allowRoles("ceo", "admin", "accountant"), (req, res) => {
  res.json(invoicePostings);
});

router.get("/journals", allowRoles("ceo", "admin", "accountant"), (req, res) => {
  res.json(journalEntries);
});

router.post("/invoices", allowRoles("ceo", "admin", "sales"), (req, res) => {
  const { channel, customer, total } = req.body || {};
  if (!channel || !customer || !total) {
    return res.status(400).json({ error: "channel, customer, total are required" });
  }
  const invoice = {
    id: salesInvoices.length + 1,
    invoiceNo: `INV-${440 + salesInvoices.length + 1}`,
    channel,
    customer,
    total,
    status: "pending"
  };
  salesInvoices.push(invoice);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "sales.invoice.create", entityType: "sales_invoice", entityId: invoice.id, module: "sales", after: invoice });
  res.status(201).json(invoice);
});

module.exports = router;