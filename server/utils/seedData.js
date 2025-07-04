const bcrypt = require("bcryptjs");
const { getDatabase } = require("../config/database");

const seedData = async () => {
	const db = getDatabase();

	console.log("🌱 Starting database seeding...");

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

		const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
		if (userCount > 0) {
			console.log("📊 Database already has data, clearing for fresh seed...");

			db.exec("DELETE FROM likes");
			db.exec("DELETE FROM tweets");
			db.exec("DELETE FROM users");

			db.exec('DELETE FROM sqlite_sequence WHERE name IN ("users", "tweets", "likes")');
		}

		const hashedPassword = await bcrypt.hash("password123", 10);

		const userInsert = db.prepare(`
            INSERT INTO users (username, email, password, bio, created_at)
            VALUES (?, ?, ?, ?, ?)
        `);

		const users = [
			{
				username: "john_doe",
				email: "john@example.com",
				bio: "Software developer and coffee enthusiast",
				createdAt: new Date("2024-01-15").toISOString(),
			},
			{
				username: "jane_smith",
				email: "jane@example.com",
				bio: "UX designer who loves to code",
				createdAt: new Date("2024-02-10").toISOString(),
			},
			{
				username: "tech_guru",
				email: "guru@example.com",
				bio: "Tech enthusiast sharing daily insights",
				createdAt: new Date("2024-03-05").toISOString(),
			},
			{
				username: "sarah_codes",
				email: "sarah@example.com",
				bio: "Full-stack developer | React & Node.js | Open source contributor",
				createdAt: new Date("2024-01-20").toISOString(),
			},
			{
				username: "mike_data",
				email: "mike@example.com",
				bio: "Data scientist turning numbers into insights 📊",
				createdAt: new Date("2024-02-28").toISOString(),
			},
			{
				username: "ai_enthusiast",
				email: "ai@example.com",
				bio: "AI researcher | Machine Learning | Python evangelist 🤖",
				createdAt: new Date("2024-03-12").toISOString(),
			},
			{
				username: "designwiz",
				email: "design@example.com",
				bio: "Creative director & UI/UX designer | Making the web beautiful ✨",
				createdAt: new Date("2024-01-08").toISOString(),
			},
			{
				username: "devops_ninja",
				email: "devops@example.com",
				bio: "DevOps engineer | Kubernetes | Cloud architecture | Coffee addict ☁️",
				createdAt: new Date("2024-04-02").toISOString(),
			},
		];

		const insertUsers = db.transaction(() => {
			users.forEach((user) => {
				userInsert.run(user.username, user.email, hashedPassword, user.bio, user.createdAt);
			});
		});

		insertUsers();
		console.log(`✅ Inserted ${users.length} users`);

		const tweetInsert = db.prepare(`
            INSERT INTO tweets (user_id, content, created_at)
            VALUES (?, ?, ?)
        `);

		const tweets = [
			{
				userId: 1,
				content: "Just finished building an amazing React component! 🚀",
				createdAt: new Date("2024-06-30T10:30:00").toISOString(),
			},
			{
				userId: 2,
				content: "Working on some new UI designs. The future of web design is looking bright! ✨",
				createdAt: new Date("2024-06-30T14:15:00").toISOString(),
			},
			{
				userId: 3,
				content: "Hot take: CSS Grid is still underrated in 2024 🔥",
				createdAt: new Date("2024-07-01T09:45:00").toISOString(),
			},
			{
				userId: 1,
				content: "Coffee break = debugging break ☕️",
				createdAt: new Date("2024-07-01T15:20:00").toISOString(),
			},
			{
				userId: 4,
				content:
					"Finally deployed my first microservice architecture! The learning curve was steep but so worth it 💪",
				createdAt: new Date("2024-06-29T16:45:00").toISOString(),
			},
			{
				userId: 5,
				content:
					"Data visualization tip: Always consider your audience before choosing chart types. What's obvious to you might be confusing to others 📊",
				createdAt: new Date("2024-06-30T11:20:00").toISOString(),
			},
			{
				userId: 6,
				content:
					"The new GPT-4 API updates are incredible! The speed improvements alone are game-changing for production apps 🤖⚡",
				createdAt: new Date("2024-07-01T08:30:00").toISOString(),
			},
			{
				userId: 7,
				content:
					"Design systems aren't just about consistency - they're about empowering teams to move faster while maintaining quality ⚡",
				createdAt: new Date("2024-06-28T13:15:00").toISOString(),
			},
			{
				userId: 8,
				content:
					"Kubernetes lesson learned: Always set resource limits. Your future self (and your budget) will thank you 💸",
				createdAt: new Date("2024-06-30T09:50:00").toISOString(),
			},
			{
				userId: 1,
				content: "That moment when your code works on the first try... but you don't trust it 😂",
				createdAt: new Date("2024-06-27T13:30:00").toISOString(),
			},
		];

		const insertTweets = db.transaction(() => {
			tweets.forEach((tweet) => {
				tweetInsert.run(tweet.userId, tweet.content, tweet.createdAt);
			});
		});

		insertTweets();
		console.log(`✅ Inserted ${tweets.length} tweets`);

		const likeInsert = db.prepare(`
            INSERT INTO likes (user_id, tweet_id, created_at)
            VALUES (?, ?, ?)
        `);

		const sampleLikes = [
			{ userId: 2, tweetId: 1 },
			{ userId: 3, tweetId: 1 },
			{ userId: 4, tweetId: 1 },
			{ userId: 1, tweetId: 2 },
			{ userId: 3, tweetId: 2 },
			{ userId: 1, tweetId: 3 },
			{ userId: 2, tweetId: 3 },
			{ userId: 4, tweetId: 3 },
			{ userId: 5, tweetId: 3 },
			{ userId: 2, tweetId: 4 },
			{ userId: 6, tweetId: 5 },
			{ userId: 7, tweetId: 5 },
			{ userId: 1, tweetId: 6 },
			{ userId: 8, tweetId: 7 },
		];

		const insertLikes = db.transaction(() => {
			sampleLikes.forEach((like) => {
				likeInsert.run(like.userId, like.tweetId, new Date().toISOString());
			});
		});

		insertLikes();
		console.log(`✅ Inserted ${sampleLikes.length} likes`);

		console.log("🎉 Database seeding completed successfully!");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		throw error;
	}
};

module.exports = { seedData };
