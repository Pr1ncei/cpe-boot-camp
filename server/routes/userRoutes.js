const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { getCurrentUser, getUserByUsername, searchUsers, getUserActivity } = require("../services/userService");

const router = express.Router();

router.get("/me", authenticateToken, (req, res, next) => {
	try {
		const user = getCurrentUser(req.user.userId);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.get("/search", (req, res, next) => {
	try {
		const { q, limit } = req.query;
		if (!q) {
			return res.status(400).json({ error: "Search query is required" });
		}

		const users = searchUsers(q, parseInt(limit) || 10);
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/:username/activity", authenticateToken, (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);

		if (user.id !== req.user.userId) {
			return res.status(403).json({ error: "Access denied" });
		}

		const limit = parseInt(req.query.limit) || 20;
		const activity = getUserActivity(user.id, limit);
		res.json(activity);
	} catch (error) {
		next(error);
	}
});

router.get("/:username", (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
