const formatDate = (date) => {
	return new Date(date).toLocaleDateString();
};

const formatDateTime = (date) => {
	return new Date(date).toLocaleString();
};

const sanitizeString = (str) => {
	return str.trim().replace(/[<>]/g, "");
};

const generateRandomId = () => {
	return Math.random().toString(36).substr(2, 9);
};

module.exports = {
	formatDate,
	formatDateTime,
	sanitizeString,
	generateRandomId,
};
