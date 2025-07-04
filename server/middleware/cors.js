const cors = require("cors");

const corsOptions = {
	origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : true, // Allow all origins in development
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
