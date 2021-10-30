const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { list, create, read, update, remove } = require("../controllers/Category");

router.get("/categories", list);
router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;