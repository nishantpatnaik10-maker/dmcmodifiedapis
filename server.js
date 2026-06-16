const express = require("express");
const cors = require("cors");
const devices = require("./data/devices");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Request logger ───────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ─── Helper: validate IMEI format (15 digits) ────────────────────────────────
function isValidIMEI(imei) {
  return typeof imei === "string" && /^\d{15}$/.test(imei);
}

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    service: "Device Validation Mock API",
    version: "1.0.0",
    status: "running",
    endpoints: [
      { method: "POST", path: "/api/v1/device/validate", description: "Validate a device by IMEI number" },
      { method: "GET",  path: "/api/v1/devices",         description: "List all registered IMEI numbers (mock only)" },
      { method: "GET",  path: "/health",                  description: "Health check" }
    ]
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// ─── GET /api/v1/devices  ─────────────────────────────────────────────────────
// Returns all known IMEI numbers for easy testing
app.get("/api/v1/devices", (req, res) => {
  const knownIMEIs = Object.keys(devices).map((imei) => ({
    imei,
    productId: devices[imei].productId
  }));
  res.json({ devices: knownIMEIs, total: knownIMEIs.length });
});

// ─── POST /api/v1/device/validate ─────────────────────────────────────────────
/**
 * Request body:
 * {
 *   "imei": "994505989132903"
 * }
 *
 * Success response (200):
 * {
 *   "productId": "...",
 *   "serials": [...],
 *   "events": [...]
 * }
 *
 * Error responses:
 *   400 – missing or invalid IMEI
 *   404 – IMEI not found in the system
 */
app.post("/api/v1/device/validate", (req, res) => {
  const { imei } = req.body;

  // ── 1. Presence check ──────────────────────────────────────────────────────
  if (!imei) {
    return res.status(400).json({
      error: "BAD_REQUEST",
      message: "Request body must include an 'imei' field.",
      example: { imei: "994505989132903" }
    });
  }

  // ── 2. Format check (15 numeric digits) ───────────────────────────────────
  if (!isValidIMEI(imei)) {
    return res.status(400).json({
      error: "INVALID_IMEI_FORMAT",
      message: "IMEI must be exactly 15 numeric digits.",
      received: imei
    });
  }

  // ── 3. Lookup ──────────────────────────────────────────────────────────────
  const device = devices[imei];

  if (!device) {
    return res.status(404).json({
      error: "DEVICE_NOT_FOUND",
      message: `No device found for IMEI: ${imei}`,
      imei
    });
  }

  // ── 4. Return device validation response ──────────────────────────────────
  return res.status(200).json(device);
});

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: `Route ${req.method} ${req.path} does not exist.`,
    availableEndpoints: [
      "POST /api/v1/device/validate",
      "GET  /api/v1/devices",
      "GET  /health"
    ]
  });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred."
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Device Validation Mock API running on port ${PORT}`);
  console.log(`   POST http://localhost:${PORT}/api/v1/device/validate`);
  console.log(`   GET  http://localhost:${PORT}/api/v1/devices`);
});
