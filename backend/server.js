const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

// ===============================
// 🔹 Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// 🔹 Health check route
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is healthy"
  });
});

// ===============================
// 🔹 Blockchain routes
// ===============================
const blockchainRoutes = require("./routes/blockchainRoutes");
app.use("/api/blockchain", blockchainRoutes);

// ===============================
// 🔹 Root route (optional)
// ===============================
app.get("/", (req, res) => {
  res.send("Supply Chain Backend is running");
});

// ===============================
// 🔹 Start server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
