const express = require("express");
const { users, roles } = require("../data/mockData");
const { signToken, verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  const user = users.find(
    (u) => u.username === String(username || "").trim() && u.password === String(password || "")
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const role = roles.find((r) => r.id === user.roleId);
  const token = signToken({
    userId: user.id,
    username: user.username,
    roleId: user.roleId,
    roleName: role?.name || user.roleId
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      roleId: user.roleId,
      roleName: role?.name || user.roleId
    }
  });
});

router.get("/me", verifyToken, (req, res) => {
  const role = roles.find((r) => r.id === req.user.roleId);
  res.json({
    userId: req.user.userId,
    username: req.user.username,
    roleId: req.user.roleId,
    roleName: role?.name || req.user.roleId
  });
});

module.exports = router;
