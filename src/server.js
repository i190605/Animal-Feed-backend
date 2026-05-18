const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/auth");
const healthRoute = require("./routes/health");
const rolesRoute = require("./routes/roles");
const modulesRoute = require("./routes/modules");
const dashboardsRoute = require("./routes/dashboards");
const procurementRoute = require("./routes/procurement");
const productionRoute = require("./routes/production");
const inventoryRoute = require("./routes/inventory");
const transportRoute = require("./routes/transport");
const salesRoute = require("./routes/sales");
const usersRoute = require("./routes/users");
const reportsRoute = require("./routes/reports");
const auditRoute = require("./routes/audit");
const { verifyToken } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Animal Feed ERP Phase 2 API",
    version: "2.0.0",
    docs: [
      "POST /api/auth/login",
      "GET /api/auth/me",
      "GET /api/health",
      "GET /api/roles",
      "GET /api/modules",
      "GET /api/dashboards",
      "GET /api/dashboards/:roleId",
      "GET /api/procurement/purchase-orders",
      "GET /api/production/batches",
      "GET /api/inventory/items",
      "GET /api/transport/trips",
      "GET /api/sales/invoices",
      "GET /api/users",
      "GET /api/reports/summary"
      ,"GET /api/audit"
    ]
  });
});

app.use("/api/auth", authRoute);
app.use("/api/health", healthRoute);
app.use("/api/roles", verifyToken, rolesRoute);
app.use("/api/modules", verifyToken, modulesRoute);
app.use("/api/dashboards", verifyToken, dashboardsRoute);
app.use("/api/procurement", verifyToken, procurementRoute);
app.use("/api/production", verifyToken, productionRoute);
app.use("/api/inventory", verifyToken, inventoryRoute);
app.use("/api/transport", verifyToken, transportRoute);
app.use("/api/sales", verifyToken, salesRoute);
app.use("/api/users", verifyToken, usersRoute);
app.use("/api/reports", verifyToken, reportsRoute);
app.use("/api/audit", verifyToken, auditRoute);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AnimalFeed backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
