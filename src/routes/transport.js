const express = require("express");
const { transportTrips, vehicles, podRecords, fuelLogs, documentAttachments, dispatchAssignments, deliveryTracking } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");
const { addAuditLog } = require("../services/audit");

const router = express.Router();

router.get("/trips", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  const scoped = req.user.roleId === "driver"
    ? transportTrips.filter((t) => t.driver === req.user.roleId)
    : transportTrips;
  res.json(scoped);
});

router.get("/vehicles", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(vehicles);
});

router.get("/pod", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(podRecords);
});

router.get("/fuel-logs", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(fuelLogs);
});

router.get("/attachments", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(documentAttachments.filter((d) => d.module === "dispatch"));
});

router.get("/assignments", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(dispatchAssignments);
});

router.get("/tracking", allowRoles("ceo", "admin", "operations", "driver"), (req, res) => {
  res.json(deliveryTracking);
});

router.post("/trips", allowRoles("ceo", "admin", "operations"), (req, res) => {
  const { vehicle, route, driver } = req.body || {};
  if (!vehicle || !route || !driver) {
    return res.status(400).json({ error: "vehicle, route, driver are required" });
  }
  const trip = {
    id: transportTrips.length + 1,
    tripNo: `TR-${1100 + transportTrips.length + 1}`,
    vehicle,
    route,
    status: "planned",
    driver
  };
  transportTrips.push(trip);
  addAuditLog({ actorUserId: req.user.userId, actorUsername: req.user.username, actorRoleId: req.user.roleId, action: "dispatch.trip.create", entityType: "trip", entityId: trip.id, module: "dispatch", after: trip });
  res.status(201).json(trip);
});

module.exports = router;