const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authSchema = require("../schemas/auth.schema");
const validate = require("../middlewares/validate");

router.post("/register", validate(authSchema), register);
router.post("/login", login);

module.exports = router;
