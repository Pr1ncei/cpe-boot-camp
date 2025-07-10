const { initializeDatabase, getDatabase, getStats } = require("./config/database");

console.log("🧪 Testing SQLite Database Setup...\n");

try {
	initializeDatabase();

	const db = getDatabase();

	console.log("📊 Testing basic queries...");

	const tables = db
		.prepare(
			`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
    `
		)
		.all(); 

	console.log("✅ Tables found:", tables.map((t) => t.name).join(", "));

	const stats = getStats();
	console.log("📈 Database stats:", stats);

	const users = db.prepare("SELECT username, email, bio FROM users LIMIT 3").all();
	console.log("\n👥 Sample users:");
	users.forEach((user) => {
		console.log(`  - ${user.username} (${user.email})`);
		console.log(`    Bio: ${user.bio.substring(0, 50)}...`);
	});

	const tweets = db
		.prepare(
			`
        SELECT t.content, u.username, t.likes, t.created_at
        FROM tweets t
        JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC
        LIMIT 3
    `
		)
		.all();

	console.log("\n🐦 Sample tweets:");
	tweets.forEach((tweet) => {
		console.log(`  - @${tweet.username}: ${tweet.content.substring(0, 60)}...`);
		console.log(`    Likes: ${tweet.likes} | Date: ${tweet.created_at}`);
	});

	const likesCount = db.prepare("SELECT COUNT(*) as count FROM likes").get().count;
	console.log(`\n❤️  Total likes in database: ${likesCount}`);

	console.log("\n🎉 Database test completed successfully!");
	console.log("\n🚀 You can now start your server with: npm start");
} catch (error) {
	console.error("❌ Database test failed:", error);
	console.log("\n🔧 Try these steps:");
	console.log("1. Make sure better-sqlite3 is installed: npm install better-sqlite3");
	console.log("2. Check file permissions in the data/ directory");
	console.log("3. Verify all files are in the correct locations");
} finally {
	process.exit(0);
}
