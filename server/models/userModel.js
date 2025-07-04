const { getDatabase } = require("../config/database");

const createUser = (userData) => {
	const db = getDatabase();

	const stmt = db.prepare(`
        INSERT INTO users (username, email, password, bio, created_at)
        VALUES (?, ?, ?, ?, ?)
    `);

	const now = userData.createdAt || new Date().toISOString();
	const bio = userData.bio || "";

	const result = stmt.run(userData.username, userData.email, userData.password, bio, now);

	return {
		id: result.lastInsertRowid,
		username: userData.username,
		email: userData.email,
		password: userData.password,
		bio: bio,
		createdAt: now,
	};
};

const findAllUsers = () => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT * FROM users ORDER BY created_at DESC");
	return stmt.all();
};

const findUserById = (id) => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
	return stmt.get(id);
};

const findUserByUsername = (username) => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
	return stmt.get(username);
};

const findUserByEmail = (email) => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
	return stmt.get(email);
};

const findUserByUsernameOrEmail = (identifier) => {
	const db = getDatabase();
	const stmt = db.prepare("SELECT * FROM users WHERE username = ? OR email = ?");
	return stmt.get(identifier, identifier);
};

const saveUser = (user) => {
	const db = getDatabase();

	const existing = findUserById(user.id);

	if (existing) {
		const stmt = db.prepare(`
            UPDATE users 
            SET username = ?, email = ?, password = ?, bio = ?
            WHERE id = ?
        `);

		stmt.run(user.username, user.email, user.password, user.bio, user.id);
	} else {
		const stmt = db.prepare(`
            INSERT INTO users (id, username, email, password, bio, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

		stmt.run(
			user.id,
			user.username,
			user.email,
			user.password,
			user.bio,
			user.createdAt || new Date().toISOString()
		);
	}

	return user;
};

const deleteUser = (id) => {
	const db = getDatabase();
	const stmt = db.prepare("DELETE FROM users WHERE id = ?");
	const result = stmt.run(id);
	return result.changes > 0;
};

const getUserStats = (userId) => {
	const db = getDatabase();

	try {
		const tweetStmt = db.prepare("SELECT COUNT(*) as count FROM tweets WHERE user_id = ?");
		const tweetCount = tweetStmt.get(userId).count;

		const likesGivenStmt = db.prepare("SELECT COUNT(*) as count FROM likes WHERE user_id = ?");
		const likesGiven = likesGivenStmt.get(userId).count;

		const likesReceivedStmt = db.prepare(`
            SELECT COUNT(*) as count 
            FROM likes l 
            JOIN tweets t ON l.tweet_id = t.id 
            WHERE t.user_id = ?
        `);
		const likesReceived = likesReceivedStmt.get(userId).count;

		return {
			tweetsCount: tweetCount,
			likesGiven: likesGiven,
			likesReceived: likesReceived,
		};
	} catch (error) {
		console.error("Error getting user stats:", error);
		return {
			tweetsCount: 0,
			likesGiven: 0,
			likesReceived: 0,
		};
	}
};

const userToJSON = (user) => {
	if (!user) return null;

	const cleanUser = {
		id: user.id,
		username: user.username,
		email: user.email,
		bio: user.bio || "",
		createdAt: user.created_at || user.createdAt,
	};

	Object.keys(cleanUser).forEach((key) => {
		if (cleanUser[key] === undefined || cleanUser[key] === null) {
			delete cleanUser[key];
		}
	});

	return cleanUser;
};

module.exports = {
	createUser,
	findAllUsers,
	findUserById,
	findUserByUsername,
	findUserByEmail,
	findUserByUsernameOrEmail,
	saveUser,
	deleteUser,
	getUserStats,
	userToJSON,
};
