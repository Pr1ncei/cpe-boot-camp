// routes/userRoutes.js

const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { getCurrentUser, getUserByUsername, searchUsers, getUserActivity } = require("../services/userService");
const { ValidationError, AuthorizationError } = require("../utils/customErrors");

const router = express.Router();

// GET /api/users/me - Get current user profile (requires auth)
router.get("/me", authenticateToken, (req, res, next) => {
	try {
		const user = getCurrentUser(req.user.userId);
		res.status(200).json(user); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/users/search - Search users by username or bio
router.get("/search", (req, res, next) => {
	try {
		const { q, limit } = req.query;

		if (!q) {
			throw new ValidationError("Search query is required");
		}

		const users = searchUsers(q, parseInt(limit) || 10);
		res.status(200).json(users); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/users/:username/activity - Get user activity (requires auth, own profile only)
router.get("/:username/activity", authenticateToken, (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);

		// Check if user is accessing their own activity
		if (user.id !== req.user.userId) {
			throw new AuthorizationError("You can only view your own activity");
		}

		const limit = parseInt(req.query.limit) || 20;
		const activity = getUserActivity(user.id, limit);
		res.status(200).json(activity); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/users/:username - Get user profile by username
router.get("/:username", (req, res, next) => {
	try {
		const user = getUserByUsername(req.params.username);
		res.status(200).json(user); // 200 OK
	} catch (error) {
		next(error);
	}
});

module.exports = router;
