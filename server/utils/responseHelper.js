// utils/responseHelper.js (Optional utility for cleaner code)

const createResponse = (status, message, data = undefined) => {
	const response = { status, message };

	// Only add data if it's provided and not undefined
	if (data !== undefined) {
		response.data = data;
	}

	return response;
};

// Usage examples:
// Success with data:
res.status(200).json(createResponse("success", "Tweet retrieved successfully", tweet));

// Success without data:
res.status(200).json(createResponse("success", "Tweet deleted successfully"));

// Error without data:
res.status(404).json(createResponse("error", "Tweet not found"));

module.exports = { createResponse };
