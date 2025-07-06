// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
	console.error("Error:", err.stack);

	// Default error response structure
	const errorResponse = {
		status: "error",
		message: "Internal server error",
	};

	// JWT Errors
	if (err.name === "JsonWebTokenError") {
		return res.status(401).json({
			status: "error",
			message: "Invalid token",
		});
	}

	if (err.name === "TokenExpiredError") {
		return res.status(401).json({
			status: "error",
			message: "Token expired",
		});
	}

	// Validation Errors
	if (err.name === "ValidationError") {
		return res.status(400).json({
			status: "error",
			message: err.message,
		});
	}

	// SQLite Database Errors
	if (err.code && err.code.startsWith("SQLITE_")) {
		if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
			const field = err.message.includes("username")
				? "username"
				: err.message.includes("email")
				? "email"
				: "field";
			return res.status(409).json({
				status: "error",
				message: `This ${field} already exists`,
			});
		}

		const response = {
			status: "error",
			message: "Database error",
		};

		if (process.env.NODE_ENV === "development") {
			response.data = { details: err.message };
		}

		return res.status(500).json(response);
	}

	// Custom Application Errors (if you're using statusCode)
	if (err.statusCode) {
		return res.status(err.statusCode).json({
			status: "error",
			message: err.message,
		});
	}

	// Default 500 error
	const response = {
		status: "error",
		message: err.message || "Internal server error",
	};

	if (process.env.NODE_ENV === "development") {
		response.data = { stack: err.stack };
	}

	res.status(500).json(response);
};

module.exports = errorHandler;
