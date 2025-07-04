const { getDatabase } = require("../config/database");

const createTweet = (tweetData) => {
	const db = getDatabase();

	const stmt = db.prepare(`
        INSERT INTO tweets (user_id, content, likes, retweets, created_at)
        VALUES (?, ?, ?, ?, ?)
    `);

	const now = tweetData.createdAt || new Date().toISOString();
	const likes = tweetData.likes || 0;
	const retweets = tweetData.retweets || 0;

	const result = stmt.run(tweetData.userId, tweetData.content, likes, retweets, now);

	return {
		id: result.lastInsertRowid,
		userId: tweetData.userId,
		content: tweetData.content,
		likes: likes,
		retweets: retweets,
		createdAt: now,
	};
};

const findAllTweets = () => {
	const db = getDatabase();
	const stmt = db.prepare(`
        SELECT t.*, 
               COUNT(l.id) as actual_likes
        FROM tweets t
        LEFT JOIN likes l ON t.id = l.tweet_id
        GROUP BY t.id
        ORDER BY t.created_at DESC
    `);
	return stmt.all().map(formatTweet);
};

const findTweetById = (id) => {
	const db = getDatabase();
	const stmt = db.prepare(`
        SELECT t.*, 
               COUNT(l.id) as actual_likes
        FROM tweets t
        LEFT JOIN likes l ON t.id = l.tweet_id
        WHERE t.id = ?
        GROUP BY t.id
    `);
	const tweet = stmt.get(id);
	return tweet ? formatTweet(tweet) : null;
};

const findTweetsByUserId = (userId) => {
	const db = getDatabase();
	const stmt = db.prepare(`
        SELECT t.*, 
               COUNT(l.id) as actual_likes
        FROM tweets t
        LEFT JOIN likes l ON t.id = l.tweet_id
        WHERE t.user_id = ?
        GROUP BY t.id
        ORDER BY t.created_at DESC
    `);
	return stmt.all(userId).map(formatTweet);
};

const findTweetsWithPagination = (page = 1, limit = 20) => {
	const db = getDatabase();

	
	const countStmt = db.prepare("SELECT COUNT(*) as count FROM tweets");
	const totalTweets = countStmt.get().count;

	
	const offset = (page - 1) * limit;
	const stmt = db.prepare(`
        SELECT t.*, 
               COUNT(l.id) as actual_likes
        FROM tweets t
        LEFT JOIN likes l ON t.id = l.tweet_id
        GROUP BY t.id
        ORDER BY t.created_at DESC
        LIMIT ? OFFSET ?
    `);

	const tweets = stmt.all(limit, offset).map(formatTweet);

	return {
		tweets,
		pagination: {
			currentPage: page,
			totalPages: Math.ceil(totalTweets / limit),
			totalTweets: totalTweets,
			hasNext: offset + limit < totalTweets,
			hasPrev: page > 1,
		},
	};
};

const saveTweet = (tweet) => {
	const db = getDatabase();

	
	const existing = db.prepare("SELECT id FROM tweets WHERE id = ?").get(tweet.id);

	if (existing) {
		
		const stmt = db.prepare(`
            UPDATE tweets 
            SET content = ?, likes = ?, retweets = ?
            WHERE id = ?
        `);

		stmt.run(tweet.content, tweet.likes, tweet.retweets, tweet.id);
	} else {
		
		const stmt = db.prepare(`
            INSERT INTO tweets (id, user_id, content, likes, retweets, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

		stmt.run(
			tweet.id,
			tweet.userId,
			tweet.content,
			tweet.likes,
			tweet.retweets,
			tweet.createdAt || new Date().toISOString()
		);
	}

	return tweet;
};

const deleteTweet = (tweetId) => {
	const db = getDatabase();

	
	const deleteLikesStmt = db.prepare("DELETE FROM likes WHERE tweet_id = ?");
	deleteLikesStmt.run(tweetId);

	
	const stmt = db.prepare("DELETE FROM tweets WHERE id = ?");
	const result = stmt.run(tweetId);

	return result.changes > 0;
};

const likeTweet = (tweetId, userId) => {
	const db = getDatabase();

	try {
		
		const insertStmt = db.prepare(`
            INSERT INTO likes (user_id, tweet_id, created_at)
            VALUES (?, ?, ?)
        `);

		insertStmt.run(userId, tweetId, new Date().toISOString());

		
		return findTweetById(tweetId);
	} catch (error) {
		if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
			throw new Error("Tweet already liked by this user");
		}
		throw error;
	}
};

const unlikeTweet = (tweetId, userId) => {
	const db = getDatabase();

	const stmt = db.prepare("DELETE FROM likes WHERE tweet_id = ? AND user_id = ?");
	const result = stmt.run(tweetId, userId);

	if (result.changes === 0) {
		throw new Error("Like not found");
	}

	
	return findTweetById(tweetId);
};

const isLikedByUser = (tweetId, userId) => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT id FROM likes WHERE tweet_id = ? AND user_id = ?");
	return !!stmt.get(tweetId, userId);
};

const getTweetLikers = (tweetId) => {
	const db = getDatabase();
	const stmt = db.prepare(`
        SELECT u.id, u.username, u.bio, l.created_at as liked_at
        FROM likes l
        JOIN users u ON l.user_id = u.id
        WHERE l.tweet_id = ?
        ORDER BY l.created_at DESC
    `);
	return stmt.all(tweetId);
};


const formatTweet = (tweet) => {
	if (!tweet) return null;

	
	const formatted = {
		id: tweet.id,
		userId: tweet.user_id,
		content: tweet.content,
		likes: tweet.actual_likes || tweet.likes || 0, 
		retweets: tweet.retweets || 0,
		createdAt: tweet.created_at,
	};

	return formatted;
};

module.exports = {
	createTweet,
	findAllTweets,
	findTweetById,
	findTweetsByUserId,
	findTweetsWithPagination,
	saveTweet,
	deleteTweet,
	likeTweet,
	unlikeTweet,
	isLikedByUser,
	getTweetLikers,
};
