// routes/userRoutes.js

const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { getCurrentUser, getUserByUsername, searchUsers, getUserActivity } = require("../services/userService");

const router = express.Router();

router.get("/me", authenticateToken, (req, res, next) => {
	try {
		const user = getCurrentUser(req.user.userId);

		res.status(200).json({
			status: "success",
			message: "Current user profile retrieved successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/search", (req, res, next) => {
	try {
		const { q, limit } = req.query;
		if (!q) {
			return res.status(400).json({
				status: "error",
				message: "Search query is required",
				data: null,
			});
		}

		const users = searchUsers(q, parseInt(limit) || 10);

		res.status(200).json({
			status: "success",
			message: `User search completed for "${q}"`,
			data: users,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:username/activity", authenticateToken, (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);

		if (user.id !== req.user.userId) {
			return res.status(403).json({
				status: "error",
				message: "You can only view your own activity",
				data: null,
			});
		}

		const limit = parseInt(req.query.limit) || 20;
		const activity = getUserActivity(user.id, limit);

		res.status(200).json({
			status: "success",
			message: `Activity for @${req.params.username} retrieved successfully`,
			data: activity,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:username", (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);

		res.status(200).json({
			status: "success",
			message: `Profile for @${req.params.username} retrieved successfully`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
