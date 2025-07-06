// routes/tweetRoutes.js

const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
	getAllTweets,
	getUserTweets,
	createNewTweet,
	likeTweetById,
	unlikeTweetById,
	toggleLikeTweet,
	getTweetWithLikes,
	deleteTweetById,
	getUserFeed,
	getTweetStats,
} = require("../services/tweetService");

const router = express.Router();

// GET /api/tweets - Get all tweets with pagination
router.get("/", (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const result = getAllTweets(page, limit);
		res.status(200).json(result); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/tweets/feed - Get personalized feed (requires auth)
router.get("/feed", authenticateToken, (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const result = getUserFeed(req.user.userId, page, limit);
		res.status(200).json(result); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/tweets/:id - Get single tweet
router.get("/:id", (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);

		let userId = null;
		const authHeader = req.headers["authorization"];
		if (authHeader) {
			try {
				const jwt = require("jsonwebtoken");
				const { JWT_SECRET } = require("../config/jwt");
				const token = authHeader.split(" ")[1];
				const decoded = jwt.verify(token, JWT_SECRET);
				userId = decoded.userId;
			} catch (err) {
				// Token invalid but that's ok for this endpoint
			}
		}

		const tweet = getTweetWithLikes(tweetId, userId);
		res.status(200).json(tweet); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/tweets/user/:username - Get tweets by username
router.get("/user/:username", (req, res, next) => {
	try {
		const tweets = getUserTweets(req.params.username);
		res.status(200).json(tweets); // 200 OK
	} catch (error) {
		next(error);
	}
});

// GET /api/tweets/:id/stats - Get tweet statistics
router.get("/:id/stats", (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const stats = getTweetStats(tweetId);
		res.status(200).json(stats); // 200 OK
	} catch (error) {
		next(error);
	}
});

// POST /api/tweets - Create new tweet (requires auth)
router.post("/", authenticateToken, (req, res, next) => {
	try {
		const tweet = createNewTweet(req.user.userId, req.body.content);
		res.status(201).json(tweet); // 201 Created
	} catch (error) {
		next(error);
	}
});

// POST /api/tweets/:id/like - Like a tweet (requires auth)
router.post("/:id/like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = likeTweetById(tweetId, req.user.userId);
		res.status(200).json({
			message: "Tweet liked successfully",
			tweet: result,
		}); // 200 OK
	} catch (error) {
		next(error);
	}
});

// DELETE /api/tweets/:id/like - Unlike a tweet (requires auth)
router.delete("/:id/like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = unlikeTweetById(tweetId, req.user.userId);
		res.status(200).json({
			message: "Tweet unliked successfully",
			tweet: result,
		}); // 200 OK
	} catch (error) {
		next(error);
	}
});

// POST /api/tweets/:id/toggle-like - Toggle like/unlike (requires auth)
router.post("/:id/toggle-like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = toggleLikeTweet(tweetId, req.user.userId);
		res.status(200).json({
			message: `Tweet ${result.action} successfully`,
			action: result.action,
			tweet: result.tweet,
		}); // 200 OK
	} catch (error) {
		next(error);
	}
});

// DELETE /api/tweets/:id - Delete tweet (requires auth)
router.delete("/:id", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		deleteTweetById(tweetId, req.user.userId);

		res.status(200).json({
			message: "Tweet deleted successfully",
			deletedTweetId: tweetId,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
