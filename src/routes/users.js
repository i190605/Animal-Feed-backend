const express = require("express");
const { users, roles } = require("../data/mockData");
const { allowRoles } = require("../middleware/auth");
const { listAuditLogs } = require("../services/audit");

const router = express.Router();

router.get("/", allowRoles("ceo", "admin"), (req, res) => {
  const roleMap = new Map(roles.map((r) => [r.id, r]));
  const payload = users.map((u) => {
    const role = roleMap.get(u.roleId);
    return {
      id: u.id,
      name: u.name,
      username: u.username,
      roleId: u.roleId,
      roleName: role?.name || u.roleId,
      classLevel: role?.classLevel || "Class 1"
    };
  });
  res.json(payload);
});

router.get("/activity", allowRoles("ceo", "admin"), (req, res) => {
  const activity = listAuditLogs().map((x) => ({
    id: x.id,
    at: x.at,
    actorUsername: x.actorUsername,
    actorRoleId: x.actorRoleId,
    action: x.action,
    module: x.module,
    entityType: x.entityType,
    entityId: x.entityId
  }));
  res.json(activity);
});

module.exports = router;