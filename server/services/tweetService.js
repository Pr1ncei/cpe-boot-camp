// services/tweetService.js

const { validateTweetInput } = require("../utils/validation");
const { findUserById, findUserByUsername, userToJSON } = require("../models/userModel");
const {
	createTweet,
	findTweetsWithPagination,
	findTweetsByUserId,
	findTweetById,
	deleteTweet,
	likeTweet,
	unlikeTweet,
	isLikedByUser,
	getTweetLikers,
} = require("../models/tweetModel");
const { ValidationError, NotFoundError, AuthorizationError, ConflictError } = require("../utils/customErrors");

const getAllTweets = (page, limit) => {
	const result = findTweetsWithPagination(page, limit);

	result.tweets = result.tweets.map((tweet) => {
		const user = findUserById(tweet.userId);
		return {
			...tweet,
			user: user ? userToJSON(user) : null,
		};
	});

	return result;
};

const getUserTweets = (username) => {
	const user = findUserByUsername(username);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	const tweets = findTweetsByUserId(user.id).map((tweet) => ({
		...tweet,
		user: { id: user.id, username: user.username, bio: user.bio },
	}));

	return tweets;
};

const createNewTweet = (userId, content) => {
	const { error } = validateTweetInput({ content });
	if (error) {
		throw new ValidationError(error);
	}

	// Verify user exists
	const user = findUserById(userId);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	const tweet = createTweet({
		userId,
		content: content.trim(),
	});

	return {
		...tweet,
		user: userToJSON(user),
	};
};

const likeTweetById = (tweetId, userId) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	if (isLikedByUser(tweetId, userId)) {
		throw new ConflictError("Tweet already liked by this user");
	}

	const updatedTweet = likeTweet(tweetId, userId);
	return {
		id: updatedTweet.id,
		likes: updatedTweet.likes,
	};
};

const unlikeTweetById = (tweetId, userId) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	if (!isLikedByUser(tweetId, userId)) {
		throw new ConflictError("Tweet not liked by this user");
	}

	const updatedTweet = unlikeTweet(tweetId, userId);
	return {
		id: updatedTweet.id,
		likes: updatedTweet.likes,
	};
};

const toggleLikeTweet = (tweetId, userId) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	const isLiked = isLikedByUser(tweetId, userId);

	if (isLiked) {
		const updatedTweet = unlikeTweet(tweetId, userId);
		return {
			action: "unliked",
			tweet: {
				id: updatedTweet.id,
				likes: updatedTweet.likes,
			},
		};
	} else {
		const updatedTweet = likeTweet(tweetId, userId);
		return {
			action: "liked",
			tweet: {
				id: updatedTweet.id,
				likes: updatedTweet.likes,
			},
		};
	}
};

const getTweetWithLikes = (tweetId, userId = null) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	const user = findUserById(tweet.userId);
	const likers = getTweetLikers(tweetId);

	return {
		...tweet,
		user: user ? userToJSON(user) : null,
		likedByCurrentUser: userId ? isLikedByUser(tweetId, userId) : false,
		likers: likers.map((liker) => ({
			id: liker.id,
			username: liker.username,
			bio: liker.bio,
			likedAt: liker.liked_at,
		})),
	};
};

const deleteTweetById = (tweetId, userId) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	if (tweet.userId !== userId) {
		throw new AuthorizationError("You can only delete your own tweets");
	}

	return deleteTweet(tweetId);
};

const getUserFeed = (userId, page = 1, limit = 20) => {
	// Verify user exists
	const user = findUserById(userId);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	const result = getAllTweets(page, limit);

	result.tweets = result.tweets.map((tweet) => ({
		...tweet,
		likedByCurrentUser: isLikedByUser(tweet.id, userId),
	}));

	return result;
};

const getTweetStats = (tweetId) => {
	const tweet = findTweetById(tweetId);
	if (!tweet) {
		throw new NotFoundError("Tweet not found");
	}

	const likers = getTweetLikers(tweetId);

	return {
		id: tweet.id,
		likes: tweet.likes,
		retweets: tweet.retweets,
		likerCount: likers.length,
		likers: likers.slice(0, 5).map((liker) => ({
			id: liker.id,
			username: liker.username,
		})),
	};
};

module.exports = {
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
};
