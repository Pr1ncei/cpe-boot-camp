const validateRegisterInput = (data) => {
	const { username, email, password } = data;

	if (!username || username.trim().length < 3) {
		return { error: "Username must be at least 3 characters long" };
	}

	if (!email || !email.includes("@")) {
		return { error: "Valid email is required" };
	}

	if (!password || password.length < 6) {
		return { error: "Password must be at least 6 characters long" };
	}

	return { error: null };
};

const validateLoginInput = (data) => {
	const { username, password } = data;

	if (!username || !password) {
		return { error: "Username and password are required" };
	}

	return { error: null };
};

const validateTweetInput = (data) => {
	const { content } = data;

	if (!content || content.trim().length === 0) {
		return { error: "Tweet content is required" };
	}

	if (content.length > 280) {
		return { error: "Tweet content must be 280 characters or less" };
	}

	return { error: null };
};

module.exports = {
	validateRegisterInput,
	validateLoginInput,
	validateTweetInput,
};
