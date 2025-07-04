const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "twitter_clone.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

const createTables = () => {
	console.log("📋 Creating database tables...");

	try {
		db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                bio TEXT DEFAULT '',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
		console.log("✅ Users table created");

		db.exec(`
            CREATE TABLE IF NOT EXISTS tweets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                content TEXT NOT NULL CHECK(length(content) <= 280),
                likes INTEGER DEFAULT 0,
                retweets INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `);
		console.log("✅ Tweets table created");

		db.exec(`
            CREATE TABLE IF NOT EXISTS likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                tweet_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (tweet_id) REFERENCES tweets (id) ON DELETE CASCADE,
                UNIQUE(user_id, tweet_id)
            )
        `);
		console.log("✅ Likes table created");

		db.exec(`
            CREATE INDEX IF NOT EXISTS idx_tweets_user_id ON tweets(user_id);
            CREATE INDEX IF NOT EXISTS idx_tweets_created_at ON tweets(created_at);
            CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
            CREATE INDEX IF NOT EXISTS idx_likes_tweet_id ON likes(tweet_id);
        `);
		console.log("✅ Database indexes created");
	} catch (error) {
		console.error("❌ Error creating tables:", error);
		throw error;
	}
};

const initializeDatabase = () => {
	console.log("🗄️  Initializing SQLite database...");

	createTables();

	console.log("✅ Database tables created successfully");

	try {
		const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
		if (userCount === 0) {
			console.log("📝 Seeding initial data...");
			const { seedData } = require("../utils/seedData");
			seedData();
		} else {
			console.log("📊 Database already contains data, skipping seed");
		}
	} catch (error) {
		console.error("Error checking user count:", error);
		console.log("📝 Attempting to seed data anyway...");
		const { seedData } = require("../utils/seedData");
		seedData();
	}
};

const getDatabase = () => db;

const getStats = () => {
	try {
		const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
		const tweetCount = db.prepare("SELECT COUNT(*) as count FROM tweets").get().count;

		return {
			users: userCount,
			tweets: tweetCount,
		};
	} catch (error) {
		console.error("Error getting stats:", error);
		return { users: 0, tweets: 0 };
	}
};

process.on("exit", () => {
	db.close();
});

process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));

module.exports = {
	initializeDatabase,
	getDatabase,
	getStats,
};
