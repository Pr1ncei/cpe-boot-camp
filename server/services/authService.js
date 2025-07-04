const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/jwt");
const { validateRegisterInput, validateLoginInput } = require("../utils/validation");
const {
	createUser,
	findUserByUsername,
	findUserByEmail,
	findUserByUsernameOrEmail,
	saveUser,
	userToJSON,
} = require("../models/userModel");

const registerUser = async (userData) => {
	const { error } = validateRegisterInput(userData);
	if (error) {
		throw new Error(error);
	}

	const { username, email, password } = userData;

	if (findUserByUsername(username)) {
		throw new Error("Username already exists");
	}

	if (findUserByEmail(email)) {
		throw new Error("Email already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = createUser({
		username,
		email,
		password: hashedPassword,
	});

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

	return { user: userToJSON(user), token };
};

const loginUser = async (credentials) => {
	const { error } = validateLoginInput(credentials);
	if (error) {
		throw new Error(error);
	}

	const { username, password } = credentials;

	const user = findUserByUsernameOrEmail(username);
	if (!user) {
		throw new Error("Invalid credentials");
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new Error("Invalid credentials");
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

	return { user: userToJSON(user), token };
};

module.exports = {
	registerUser,
	loginUser,
};
