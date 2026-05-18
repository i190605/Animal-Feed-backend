const express = require("express");
const { dashboards } = require("../data/mockData");
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

function normalizeDashboard(payload) {
  return {
    ...payload,
    kpis: (payload?.kpis || []).map((k) => ({
      ...k,
      titleKey: k.titleKey || toKey("kpi", k.title)
    })),
    tasks: (payload?.tasks || []).map((t) => ({
      ...t,
      itemKey: t.itemKey || toKey("task.item", t.item),
      descriptionKey: t.descriptionKey || toKey("task.description", t.description)
    }))
  };
}

router.get("/", allowRoles("ceo", "admin"), (req, res) => {
  const normalized = Object.fromEntries(
    Object.entries(dashboards).map(([roleId, data]) => [roleId, normalizeDashboard(data)])
  );
  res.json(normalized);
});

router.get("/:roleId", (req, res) => {
  const { roleId } = req.params;

  const isPrivileged = ["ceo", "admin"].includes(req.user?.roleId);
  const isSelf = req.user?.roleId === roleId;

  if (!isPrivileged && !isSelf) {
    return res.status(403).json({ error: "You can only view your own dashboard" });
  }

  const payload = dashboards[roleId];

  if (!payload) {
    return res.status(404).json({ error: `No dashboard data for role '${roleId}'` });
  }

  res.json(normalizeDashboard(payload));
});

module.exports = router;
