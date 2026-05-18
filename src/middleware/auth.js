const jwt = require("jsonwebtoken");

const JWT_SECRET = "animalfeed_phase2_secret";
const ROLE_HIERARCHY = {
  ceo: 100,
  admin: 90,
  accountant: 70,
  operations: 70,
  production: 60,
  warehouse: 60,
  sales: 60,
  electrician: 50,
  driver: 50,
  worker: 40
};

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleId)) {
      return res.status(403).json({ error: "Access denied for this role" });
    }
    next();
  };
}

function requireHierarchy(minLevel) {
  return (req, res, next) => {
    const role = req.user?.roleId;
    const level = ROLE_HIERARCHY[role] || 0;
    if (level < minLevel) {
      return res.status(403).json({ error: "Insufficient approval hierarchy level" });
    }
    next();
  };
}

module.exports = { signToken, verifyToken, allowRoles, requireHierarchy, ROLE_HIERARCHY };
