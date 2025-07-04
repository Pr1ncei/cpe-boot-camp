const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

router.post("/register", async (req, res, next) => {
	try {
		console.log("📝 Register request body:", req.body);

		const result = await registerUser(req.body);

		const response = {
			message: "User created successfully",
			user: result.user,
			token: result.token,
		};

		console.log("✅ Register successful for user:", result.user.username);
		res.status(201).json(response);
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
				error: "Username and password are required",
			});
		}

		const result = await loginUser(req.body);

		const response = {
			message: "Login successful",
			user: result.user,
			token: result.token,
		};

		console.log("✅ Login successful for user:", result.user.username);
		res.json(response);
	} catch (error) {
		console.error("❌ Login error:", error.message);
		next(error);
	}
});

module.exports = router;
