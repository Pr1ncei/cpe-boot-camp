// utils/customErrors.js

class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

class ValidationError extends AppError {
	constructor(message) {
		super(message, 400);
		this.name = "ValidationError";
	}
}

class AuthenticationError extends AppError {
	constructor(message = "Authentication failed") {
		super(message, 401);
		this.name = "AuthenticationError";
	}
}

class AuthorizationError extends AppError {
	constructor(message = "Access denied") {
		super(message, 403);
		this.name = "AuthorizationError";
	}
}

class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
		this.name = "NotFoundError";
	}
}

class ConflictError extends AppError {
	constructor(message = "Resource already exists") {
		super(message, 409);
		this.name = "ConflictError";
	}
}

class UnprocessableEntityError extends AppError {
	constructor(message = "Unprocessable entity") {
		super(message, 422);
		this.name = "UnprocessableEntityError";
	}
}

module.exports = {
	AppError,
	ValidationError,
	AuthenticationError,
	AuthorizationError,
	NotFoundError,
	ConflictError,
	UnprocessableEntityError,
};
