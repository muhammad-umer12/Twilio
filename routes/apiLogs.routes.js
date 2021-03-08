const express = require("express");
const router = express.Router();

const apiLogController = require("../controller/ApiLogController");

router.get("/createApiLogs/:area_code/:limit", apiLogController.createApiLog);

module.exports = router;
