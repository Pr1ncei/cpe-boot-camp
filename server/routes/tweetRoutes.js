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

router.get("/", (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const result = getAllTweets(page, limit);

		res.status(200).json({
			status: "success",
			message: "Tweets retrieved successfully",
			data: result,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/feed", authenticateToken, (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const result = getUserFeed(req.user.userId, page, limit);

		res.status(200).json({
			status: "success",
			message: "Feed retrieved successfully",
			data: result,
		});
	} catch (error) {
		next(error);
	}
});

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
			} catch (err) {}
		}

		const tweet = getTweetWithLikes(tweetId, userId);

		res.status(200).json({
			status: "success",
			message: "Tweet retrieved successfully",
			data: tweet,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/user/:username", (req, res, next) => {
	try {
		const tweets = getUserTweets(req.params.username);

		res.status(200).json({
			status: "success",
			message: `Tweets for @${req.params.username} retrieved successfully`,
			data: tweets,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:id/stats", (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const stats = getTweetStats(tweetId);

		res.status(200).json({
			status: "success",
			message: "Tweet statistics retrieved successfully",
			data: stats,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/", authenticateToken, (req, res, next) => {
	try {
		const tweet = createNewTweet(req.user.userId, req.body.content);

		res.status(201).json({
			status: "success",
			message: "Tweet created successfully",
			data: tweet,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/:id/like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = likeTweetById(tweetId, req.user.userId);

		res.status(200).json({
			status: "success",
			message: "Tweet liked successfully",
			data: result,
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:id/like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = unlikeTweetById(tweetId, req.user.userId);

		res.status(200).json({
			status: "success",
			message: "Tweet unliked successfully",
			data: result,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/:id/toggle-like", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		const result = toggleLikeTweet(tweetId, req.user.userId);

		res.status(200).json({
			status: "success",
			message: `Tweet ${result.action} successfully`,
			data: {
				action: result.action,
				tweet: result.tweet,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authenticateToken, (req, res, next) => {
	try {
		const tweetId = parseInt(req.params.id);
		deleteTweetById(tweetId, req.user.userId);

		res.status(200).json({
			status: "success",
			message: "Tweet deleted successfully",
			data: {
				deletedTweetId: tweetId,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
