const errorHandler = (err, req, res, next) => {
	console.error("Error:", err.stack);

	if (err.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "Invalid token" });
	}

	if (err.name === "TokenExpiredError") {
		return res.status(401).json({ error: "Token expired" });
	}

	if (err.name === "ValidationError") {
		return res.status(400).json({
			error: "Validation failed",
			details: err.message,
		});
	}

	if (err.code && err.code.startsWith("SQLITE_")) {
		if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return res.status(409).json({
				error: "Duplicate entry",
				details: err.message,
			});
		}

		return res.status(500).json({
			error: "Database error",
			details: process.env.NODE_ENV === "development" ? err.message : "Internal database error",
		});
	}

	res.status(err.status || 500).json({
		error: err.message || "Internal server error",
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};

module.exports = errorHandler;
