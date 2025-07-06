// middleware/errorHandler.js

const { AppError } = require("../utils/customErrors");

const handleJWTError = () => new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () => new AppError("Your token has expired. Please log in again.", 401);

const handleSQLiteConstraintError = (err) => {
	if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
		const field = err.message.includes("username") ? "username" : err.message.includes("email") ? "email" : "field";
		return new AppError(`This ${field} already exists. Please choose another.`, 409);
	}

	if (err.code === "SQLITE_CONSTRAINT_FOREIGN") {
		return new AppError("Referenced resource does not exist.", 400);
	}

	if (err.code === "SQLITE_CONSTRAINT_CHECK") {
		return new AppError("Data validation failed. Please check your input.", 400);
	}

	return new AppError("Database constraint violation.", 400);
};

const handleValidationError = (err) => {
	return new AppError(err.message, 400);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}
	// Programming or other unknown error: don't leak error details
	else {
		console.error("ERROR 💥", err);
		res.status(500).json({
			status: "error",
			message: "Something went wrong!",
		});
	}
};

const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else {
		let error = { ...err };
		error.message = err.message;

		// Handle specific error types
		if (error.name === "JsonWebTokenError") error = handleJWTError();
		if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
		if (error.code && error.code.startsWith("SQLITE_CONSTRAINT")) error = handleSQLiteConstraintError(error);
		if (error.name === "ValidationError") error = handleValidationError(error);

		sendErrorProd(error, res);
	}
};

module.exports = errorHandler;
