// services/authService.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/jwt");
const { validateRegisterInput, validateLoginInput } = require("../utils/validation");
const {
	createUser,
	findUserByUsername,
	findUserByEmail,
	findUserByUsernameOrEmail,
	userToJSON,
} = require("../models/userModel");
const { ValidationError, ConflictError, AuthenticationError } = require("../utils/customErrors");

const registerUser = async (userData) => {
	const { error } = validateRegisterInput(userData);
	if (error) {
		throw new ValidationError(error);
	}

	const { username, email, password } = userData;

	// Check for existing username
	if (findUserByUsername(username)) {
		throw new ConflictError("Username already exists");
	}

	// Check for existing email
	if (findUserByEmail(email)) {
		throw new ConflictError("Email already exists");
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
		throw new ValidationError(error);
	}

	const { username, password } = credentials;

	const user = findUserByUsernameOrEmail(username);
	if (!user) {
		throw new AuthenticationError("Invalid username or password");
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new AuthenticationError("Invalid username or password");
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

	return { user: userToJSON(user), token };
};

module.exports = {
	registerUser,
	loginUser,
};
