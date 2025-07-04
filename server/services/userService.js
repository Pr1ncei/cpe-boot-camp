const { findUserById, findUserByUsername, userToJSON, getUserStats } = require("../models/userModel");
const { findTweetsByUserId } = require("../models/tweetModel");

const getCurrentUser = (userId) => {
	const user = findUserById(userId);
	if (!user) {
		throw new Error("User not found");
	}

	const stats = getUserStats(userId);

	return {
		...userToJSON(user),
		...stats,
	};
};

const getUserByUsername = (username) => {
	const user = findUserByUsername(username);
	if (!user) {
		throw new Error("User not found");
	}

	const userTweets = findTweetsByUserId(user.id);
	const stats = getUserStats(user.id);

	return {
		...userToJSON(user),
		tweetsCount: userTweets.length,
		...stats,
	};
};

const getUserProfile = (username, currentUserId = null) => {
	const user = findUserByUsername(username);
	if (!user) {
		throw new Error("User not found");
	}

	const userTweets = findTweetsByUserId(user.id);
	const stats = getUserStats(user.id);

	const profile = {
		...userToJSON(user),
		tweetsCount: userTweets.length,
		...stats,
		isOwnProfile: currentUserId === user.id,
	};

	return profile;
};

const searchUsers = (query, limit = 10) => {
	if (!query || query.trim().length === 0) {
		return [];
	}

	const { getDatabase } = require("../config/database");
	const db = getDatabase();

	const stmt = db.prepare(`
        SELECT * FROM users 
        WHERE username LIKE ? OR bio LIKE ?
        ORDER BY username
        LIMIT ?
    `);

	const searchTerm = `%${query.trim()}%`;
	const users = stmt.all(searchTerm, searchTerm, limit);

	return users.map((user) => {
		const stats = getUserStats(user.id);
		return {
			...userToJSON(user),
			...stats,
		};
	});
};

const getUserActivity = (userId, limit = 20) => {
	const user = findUserById(userId);
	if (!user) {
		throw new Error("User not found");
	}

	const { getDatabase } = require("../config/database");
	const db = getDatabase();

	const tweetStmt = db.prepare(`
        SELECT t.*, 'tweet' as activity_type, t.created_at as activity_date
        FROM tweets t
        WHERE t.user_id = ?
        ORDER BY t.created_at DESC
        LIMIT ?
    `);

	const tweets = tweetStmt.all(userId, Math.floor(limit / 2));

	const likeStmt = db.prepare(`
        SELECT l.*, t.content, t.user_id as tweet_user_id, 'like' as activity_type, l.created_at as activity_date
        FROM likes l
        JOIN tweets t ON l.tweet_id = t.id
        WHERE l.user_id = ?
        ORDER BY l.created_at DESC
        LIMIT ?
    `);

	const likes = likeStmt.all(userId, Math.floor(limit / 2));

	const activities = [
		...tweets.map((tweet) => ({
			type: "tweet",
			id: tweet.id,
			content: tweet.content,
			date: tweet.activity_date,
			data: tweet,
		})),
		...likes.map((like) => ({
			type: "like",
			id: like.id,
			tweetId: like.tweet_id,
			content: like.content,
			date: like.activity_date,
			data: like,
		})),
	]
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, limit);

	return activities;
};

module.exports = {
	getCurrentUser,
	getUserByUsername,
	getUserProfile,
	searchUsers,
	getUserActivity,
};
