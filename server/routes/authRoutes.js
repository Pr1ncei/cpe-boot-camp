// routes/authRoutes.js

const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

router.post("/register", async (req, res, next) => {
	try {
		console.log("📝 Register request body:", req.body);

		const result = await registerUser(req.body);

		console.log("✅ Register successful for user:", result.user.username);
		res.status(201).json({
			status: "success",
			message: "User registered successfully",
			data: {
				user: result.user,
				token: result.token,
			},
		});
	} catch (error) {
		console.error("❌ Register error:", error.message);
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		console.log("🔐 Login request body:", req.body);

		if (!req.body || !req.body.username || !req.body.password) {
			return res.status(400).json({
				status: "error",
				message: "Username and password are required",
			});
		}

		const result = await loginUser(req.body);

		console.log("✅ Login successful for user:", result.user.username);
		res.status(200).json({
			status: "success",
			message: "Login successful",
			data: {
				user: result.user,
				token: result.token,
			},
		});
	} catch (error) {
		console.error("❌ Login error:", error.message);
		next(error);
	}
});

module.exports = router;
