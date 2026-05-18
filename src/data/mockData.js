const roles = [
  { id: "ceo", name: "CEO / Owner", classLevel: "Class 2" },
  { id: "admin", name: "Admin / Manager", classLevel: "Class 1/3" },
  { id: "accountant", name: "Accountant", classLevel: "Class 1/3" },
  { id: "operations", name: "Operations Coordinator (The Joker)", classLevel: "Class 1/3" },
  { id: "production", name: "Production Supervisor", classLevel: "Class 1" },
  { id: "worker", name: "Production Worker", classLevel: "Class 1" },
  { id: "electrician", name: "Electrician", classLevel: "Class 1" },
  { id: "warehouse", name: "Warehouse Supervisor", classLevel: "Class 1" },
  { id: "driver", name: "Driver / Transportation", classLevel: "Class 1" },
  { id: "sales", name: "Sales / Cashier", classLevel: "Class 1" }
];

const modules = [
  { code: "identity", name: "Identity & RBAC", status: "ready" },
  { code: "procurement", name: "Procurement", status: "planned" },
  { code: "production", name: "Production", status: "planned" },
  { code: "inventory", name: "Inventory & Warehouse", status: "planned" },
  { code: "dispatch", name: "Dispatch & Transportation", status: "planned" },
  { code: "pos", name: "POS / Sales", status: "planned" },
  { code: "accounting", name: "Accounting", status: "planned" },
  { code: "reporting", name: "Reporting & Analytics", status: "ready" },
  { code: "audit", name: "Documentation & Audit", status: "ready" }
];

const dashboards = {
  ceo: {
    kpis: [
      { title: "Monthly Revenue", value: "PKR 12.4M" },
      { title: "Production Output", value: "9,850 bags" },
      { title: "Material Variance", value: "2.8%" },
      { title: "On-time Dispatch", value: "91%" }
    ],
    tasks: [
      { item: "Stock Risk", description: "3 SKUs below reorder", severity: "warn" },
      { item: "Audit Exceptions", description: "2 open findings", severity: "danger" }
    ]
  },
  admin: {
    kpis: [
      { title: "Pending POs", value: "11" },
      { title: "Open GRNs", value: "7" },
      { title: "Pending Payments", value: "PKR 2.1M" },
      { title: "Open Approvals", value: "9" }
    ],
    tasks: [
      { item: "PO Approval", description: "5 requests awaiting", severity: "warn" },
      { item: "Invoice Mismatch", description: "3 unmatched invoices", severity: "danger" }
    ]
  },
  production: {
    kpis: [
      { title: "Active Batches", value: "8" },
      { title: "Shift Efficiency", value: "87%" },
      { title: "Scan Compliance", value: "96%" },
      { title: "Downtime", value: "42 min" }
    ],
    tasks: [
      { item: "Batch BF-204", description: "Running 62%", severity: "ok" },
      { item: "Mixer Alert", description: "Mixer #2 overload", severity: "danger" }
    ]
  },
  worker: {
    kpis: [
      { title: "Scans This Shift", value: "186" },
      { title: "Batches Supported", value: "4" },
      { title: "Variance Flags", value: "2" },
      { title: "Shift Attendance", value: "100%" }
    ],
    tasks: [
      { item: "Material Scan", description: "Batch BF-204 scan pending", severity: "warn" },
      { item: "Output Log", description: "Update final bag count", severity: "ok" }
    ]
  },
  electrician: {
    kpis: [
      { title: "Maintenance Tickets", value: "5" },
      { title: "Critical Alerts", value: "1" },
      { title: "Uptime Support", value: "97%" },
      { title: "Completed Jobs", value: "11" }
    ],
    tasks: [
      { item: "Mixer #2", description: "Check overload sensor", severity: "warn" },
      { item: "Conveyor Line B", description: "Preventive maintenance", severity: "ok" }
    ]
  },
  warehouse: {
    kpis: [
      { title: "SKUs", value: "186" },
      { title: "Low Stock", value: "9" },
      { title: "Transfers Today", value: "22" },
      { title: "Count Accuracy", value: "97.1%" }
    ],
    tasks: [
      { item: "FG-002", description: "Below reorder point", severity: "warn" },
      { item: "Damaged Stock", description: "14 bags isolated", severity: "danger" }
    ]
  },
  sales: {
    kpis: [
      { title: "Sales Today", value: "PKR 436K" },
      { title: "Invoices", value: "47" },
      { title: "Returns", value: "3" },
      { title: "Receivables", value: "PKR 1.8M" }
    ],
    tasks: [
      { item: "Counter-2", description: "Open shift", severity: "ok" },
      { item: "Invoice INV-441", description: "Credit hold", severity: "warn" }
    ]
  },
  accountant: {
    kpis: [
      { title: "Payables", value: "PKR 2.1M" },
      { title: "Receivables", value: "PKR 1.8M" },
      { title: "Open Journals", value: "13" },
      { title: "Month-End Progress", value: "72%" }
    ],
    tasks: [
      { item: "PO/GRN Match", description: "3 invoices unmatched", severity: "warn" },
      { item: "Ledger Reconciliation", description: "2 accounts pending", severity: "warn" }
    ]
  },
  operations: {
    kpis: [
      { title: "Audit Runs", value: "14" },
      { title: "Process Compliance", value: "94%" },
      { title: "Material Variance Cases", value: "5" },
      { title: "Open Action Items", value: "7" }
    ],
    tasks: [
      { item: "Floor Audit", description: "Shift B checklist pending", severity: "warn" },
      { item: "Stock Chain Review", description: "2 chain breaks flagged", severity: "danger" }
    ]
  },
  driver: {
    kpis: [
      { title: "Trips Today", value: "6" },
      { title: "On-time Deliveries", value: "92%" },
      { title: "Pending POD", value: "1" },
      { title: "GPS Alerts", value: "0" }
    ],
    tasks: [
      { item: "TR-1102", description: "Out for B2B delivery", severity: "ok" },
      { item: "TR-1105", description: "Waiting warehouse dispatch", severity: "warn" }
    ]
  }
};

const users = [
  { id: 1, username: "ceo", password: "123456", roleId: "ceo", name: "Owner" },
  { id: 2, username: "admin", password: "123456", roleId: "admin", name: "Admin User" },
  { id: 3, username: "accountant", password: "123456", roleId: "accountant", name: "Accountant User" },
  { id: 7, username: "operations", password: "123456", roleId: "operations", name: "Operations User" },
  { id: 4, username: "production", password: "123456", roleId: "production", name: "Production User" },
  { id: 8, username: "worker", password: "123456", roleId: "worker", name: "Production Worker" },
  { id: 9, username: "electrician", password: "123456", roleId: "electrician", name: "Electrician User" },
  { id: 5, username: "warehouse", password: "123456", roleId: "warehouse", name: "Warehouse User" },
  { id: 10, username: "driver", password: "123456", roleId: "driver", name: "Driver User" },
  { id: 6, username: "sales", password: "123456", roleId: "sales", name: "Sales User" }
];

const transportTrips = [
  { id: 1, tripNo: "TR-1102", vehicle: "LEA-2345", route: "Plant -> Lahore (B2B)", status: "in_transit", driver: "driver" },
  { id: 2, tripNo: "TR-1105", vehicle: "LEA-9231", route: "Plant -> Retail Hub (D2C)", status: "planned", driver: "driver" }
];

const salesInvoices = [
  { id: 1, invoiceNo: "INV-441", channel: "POS", customer: "Walk-in", total: "PKR 24,500", status: "posted" },
  { id: 2, invoiceNo: "INV-442", channel: "B2B", customer: "Khan Poultry Farms", total: "PKR 312,000", status: "pending" }
];

const cashierShifts = [
  { id: 1, shiftNo: "CS-001", cashier: "sales", openedAt: "2026-04-02T08:00:00Z", status: "closed", settlement: 120000 }
];

const salesReturns = [
  { id: 1, returnNo: "RET-1001", invoiceNo: "INV-441", amount: 2500, reason: "Damaged bag", status: "posted" }
];

const receivables = [
  { id: 1, customer: "Khan Poultry Farms", balance: 312000, agingDays: 14, status: "open" }
];

const documentAttachments = [
  { id: 1, module: "dispatch", refNo: "TR-1102", fileName: "pod-tr-1102.pdf", mimeType: "application/pdf" }
];

const reportSummary = [
  { period: "Monthly", metric: "Production Output", value: "9,850 bags" },
  { period: "Quarterly", metric: "Revenue", value: "PKR 35.2M" },
  { period: "Annual", metric: "Average Variance", value: "2.9%" }
];

const purchaseOrders = [
  {
    id: 1,
    poNo: "PO-1001",
    vendor: "Al Noor Grains",
    material: "Corn",
    qtyTons: 12,
    status: "approved",
    createdBy: "admin"
  },
  {
    id: 2,
    poNo: "PO-1002",
    vendor: "Punjab Feed Inputs",
    material: "Soybean Meal",
    qtyTons: 8,
    status: "pending",
    createdBy: "admin"
  }
];

const vendors = [
  { id: 1, code: "V-001", name: "Al Noor Grains", category: "grain", status: "approved" },
  { id: 2, code: "V-002", name: "Punjab Feed Inputs", category: "protein", status: "approved" }
];

const vendorPriceHistory = [
  { id: 1, vendorId: 1, material: "Corn", unitPrice: 94000, currency: "PKR", effectiveDate: "2026-03-01" },
  { id: 2, vendorId: 2, material: "Soybean Meal", unitPrice: 168000, currency: "PKR", effectiveDate: "2026-03-10" }
];

const purchaseRequisitions = [
  { id: 1, reqNo: "PR-1001", material: "Corn", qtyTons: 10, status: "approved", requestedBy: "warehouse" }
];

const goodsReceiptNotes = [
  { id: 1, grnNo: "GRN-5001", poNo: "PO-1001", receivedQtyTons: 12, status: "posted" }
];

const invoiceMatching = [
  { id: 1, poNo: "PO-1001", grnNo: "GRN-5001", invoiceNo: "PINV-9001", matched: true, paymentStatus: "pending" }
];

const poApprovals = [
  { id: 1, poNo: "PO-1001", level: "manager", approvedBy: "admin", status: "approved", approvedAt: "2026-04-01T10:00:00Z" }
];

const vendorOrders = [
  { id: 1, poNo: "PO-1001", vendor: "Al Noor Grains", issuedBy: "admin", issuedAt: "2026-04-01T11:00:00Z", status: "issued" }
];

const productionBatches = [
  {
    id: 1,
    batchNo: "BF-204",
    formula: "Broiler Starter Mix",
    plannedBags: 1500,
    actualBags: 920,
    shift: "A",
    status: "running"
  },
  {
    id: 2,
    batchNo: "LF-321",
    formula: "Layer Feed Mix",
    plannedBags: 900,
    actualBags: 900,
    shift: "B",
    status: "completed"
  }
];

const bomRecipes = [
  { id: 1, recipeCode: "BOM-BS", name: "Broiler Starter Mix", version: 1, status: "active" },
  { id: 2, recipeCode: "BOM-LF", name: "Layer Feed Mix", version: 1, status: "active" }
];

const materialScans = [
  { id: 1, batchNo: "BF-204", sku: "RM-CORN", expectedQty: 1200, actualQty: 1180, variance: -20, scannedBy: "worker" }
];

const materialIssues = [
  { id: 1, issueNo: "MI-1001", batchNo: "BF-204", sku: "RM-CORN", qty: 1180, issuedBy: "warehouse", status: "posted" }
];

const productionOutputs = [
  { id: 1, outputNo: "OUT-1001", batchNo: "BF-204", bags: 920, varianceBags: -580, capturedBy: "production" }
];

const inventoryItems = [
  { id: 1, sku: "RM-CORN", name: "Corn", warehouse: "Main", qty: 48, reorderLevel: 30, uom: "tons" },
  { id: 2, sku: "RM-SBM", name: "Soybean Meal", warehouse: "Main", qty: 19, reorderLevel: 25, uom: "tons" },
  { id: 3, sku: "FG-BS", name: "Broiler Starter Feed", warehouse: "FG", qty: 520, reorderLevel: 200, uom: "bags" }
];

const stockLedger = [
  { id: 1, sku: "RM-CORN", location: "Main", movementType: "receipt", qty: 12, refNo: "GRN-5001", policy: "FIFO" },
  { id: 2, sku: "RM-SBM", location: "Main", movementType: "issue", qty: -3, refNo: "BF-204", policy: "FIFO" }
];

const stockTransfers = [
  { id: 1, transferNo: "TRF-101", sku: "FG-BS", from: "FG", to: "Retail", qty: 50, status: "completed" }
];

const stockCounts = [
  { id: 1, countNo: "CNT-1001", location: "Main", varianceItems: 1, status: "reconciled" }
];

const vehicles = [
  { id: 1, vehicleNo: "LEA-2345", type: "Truck", fuelType: "Diesel", active: true },
  { id: 2, vehicleNo: "LEA-9231", type: "Truck", fuelType: "Diesel", active: true }
];

const podRecords = [
  { id: 1, tripNo: "TR-1102", deliveredAt: "2026-04-01T11:00:00Z", status: "received", attachment: "pod-tr-1102.pdf" }
];

const dispatchAssignments = [
  { id: 1, assignmentNo: "DA-1001", tripNo: "TR-1102", routePlan: "Plant -> Lahore", assignedBy: "operations", status: "assigned" }
];

const deliveryTracking = [
  { id: 1, tripNo: "TR-1102", checkpoint: "Lahore Entry", at: "2026-04-01T10:10:00Z", status: "in_transit" }
];

const fuelLogs = [
  { id: 1, tripNo: "TR-1102", liters: 45, cost: 13050, date: "2026-04-01" }
];

const invoicePostings = [
  { id: 1, invoiceNo: "INV-441", postedBy: "accountant", postedAt: "2026-04-02T09:10:00Z", status: "posted" }
];

const journalEntries = [
  { id: 1, journalNo: "JV-1001", reference: "INV-441", debit: 24500, credit: 24500, status: "posted" }
];

const kpiSnapshots = [
  { id: 1, period: "2026-04", productionBags: 9850, dispatchOnTimePct: 91, salesPkr: 12400000 }
];

const auditDocuments = [
  { id: 1, docNo: "AUD-1001", module: "accounting", title: "Monthly Close Checklist", fileName: "close-apr-2026.pdf" }
];

module.exports = {
  roles,
  modules,
  dashboards,
  users,
  purchaseOrders,
  productionBatches,
  inventoryItems,
  transportTrips,
  salesInvoices,
  reportSummary
  ,
  vendors,
  vendorPriceHistory,
  purchaseRequisitions,
  goodsReceiptNotes,
  invoiceMatching,
  poApprovals,
  vendorOrders,
  bomRecipes,
  materialScans,
  materialIssues,
  productionOutputs,
  stockLedger,
  stockTransfers,
  stockCounts,
  vehicles,
  podRecords,
  dispatchAssignments,
  deliveryTracking,
  fuelLogs,
  cashierShifts,
  salesReturns,
  receivables,
  distributionOrders,
  outletTransfers,
  posSales,
  invoicePostings,
  journalEntries,
  kpiSnapshots,
  auditDocuments,
  documentAttachments
};
