const auditLogs = [];

function addAuditLog(entry = {}) {
  const payload = {
    id: auditLogs.length + 1,
    at: new Date().toISOString(),
    actorUserId: entry.actorUserId || null,
    actorUsername: entry.actorUsername || "system",
    actorRoleId: entry.actorRoleId || "system",
    action: entry.action || "unknown.action",
    entityType: entry.entityType || "unknown",
    entityId: entry.entityId ?? null,
    module: entry.module || "general",
    before: entry.before ?? null,
    after: entry.after ?? null,
    meta: entry.meta || {}
  };
  auditLogs.push(payload);
  return payload;
}

function listAuditLogs() {
  return auditLogs;
}

module.exports = {
  addAuditLog,
  listAuditLogs
};
