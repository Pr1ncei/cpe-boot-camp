const express = require("express");
const corsMiddleware = require("./middleware/cors.js");
const errorHandler = require("./middleware/errorHandler.js");
const { initializeDatabase } = require("./config/database.js");
const { seedData } = require("./utils/seedData.js");
const documentationRoutes = require("./routes/documentationRoutes");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const tweetRoutes = require("./routes/tweetRoutes.js");

const app = express();
const PORT = process.env.PORT || 3140;

initializeDatabase();

app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

app.get("/api/health", (req, res) => {
	const { getStats } = require("./config/database");
	const stats = getStats();

	res.json({
		status: "healthy",
		timestamp: new Date(),
		uptime: process.uptime(),
		usersCount: stats.users,
		tweetsCount: stats.tweets,
	});
});

app.post("/api/reset", async (req, res) => {
	try {
		await seedData();
		res.json({ message: "Data reset successfully" });
	} catch (error) {
		console.error("Reset error:", error);
		res.status(500).json({ error: "Failed to reset data" });
	}
});

app.use("/", documentationRoutes);

app.use(/(.*)/, (req, res) => {
	console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
	res.status(404).json({
		error: "Endpoint not found",
		requestedPath: req.originalUrl,
		method: req.method,
	});
});

app.use(errorHandler);
app.listen(PORT, () => {
	console.log("\n🚀 Server running on http://localhost:" + PORT);
	console.log("=".repeat(60));

	console.log("\n📍 API ENDPOINTS:");

	// Health & Utility
	console.log("\n🛠️ UTILS:");
	console.table([
		{ Method: "GET", Endpoint: "/api/health", Description: "Health check", Auth: "❌" },
		{ Method: "POST", Endpoint: "/api/reset", Description: "Reset to seed data", Auth: "❌" },
	]);

	// Auth
	console.log("\n🔐 AUTH:");
	console.table([
		{ Method: "POST", Endpoint: "/api/auth/register", Description: "Register new user", Auth: "❌" },
		{ Method: "POST", Endpoint: "/api/auth/login", Description: "Login user", Auth: "❌" },
	]);

	// Users
	console.log("\n👤 USERS:");
	console.table([
		{ Method: "GET", Endpoint: "/api/users/me", Description: "Get current user", Auth: "🔒" },
		{ Method: "GET", Endpoint: "/api/users/:username", Description: "Get user by username", Auth: "❌" },
	]);

	// Tweets
	console.log("\n📝 TWEETS:");
	console.table([
		{ Method: "GET", Endpoint: "/api/tweets", Description: "Get all tweets", Auth: "❌" },
		{ Method: "GET", Endpoint: "/api/tweets/feed", Description: "Get personalized feed", Auth: "🔒" },
		{ Method: "GET", Endpoint: "/api/tweets/:id", Description: "Get single tweet", Auth: "❌" },
		{ Method: "GET", Endpoint: "/api/tweets/user/:username", Description: "Get user tweets", Auth: "❌" },
		{ Method: "POST", Endpoint: "/api/tweets", Description: "Create new tweet", Auth: "🔒" },
		{ Method: "POST", Endpoint: "/api/tweets/:id/like", Description: "Like a tweet", Auth: "🔒" },
		{ Method: "DELETE", Endpoint: "/api/tweets/:id/like", Description: "Unlike a tweet", Auth: "🔒" },
		{ Method: "POST", Endpoint: "/api/tweets/:id/toggle-like", Description: "Toggle like/unlike", Auth: "🔒" },
		{ Method: "DELETE", Endpoint: "/api/tweets/:id", Description: "Delete tweet", Auth: "🔒" },
	]);

	console.log("\n👤 TEST CREDENTIALS:");
	console.table([
		{ Username: "john_doe", Password: "password123" },
		{ Username: "jane_smith", Password: "password123" },
		{ Username: "tech_guru", Password: "password123" },
	]);

	// console.log("\n🧪 QUICK TEST COMMANDS:");
	// console.log(`curl http://localhost:${PORT}/api/health`);
	// console.log(
	// 	`curl -X POST http://localhost:${PORT}/api/auth/login -H "Content-Type: application/json" -d '{"username":"john_doe","password":"password123"}'`
	// );
});
