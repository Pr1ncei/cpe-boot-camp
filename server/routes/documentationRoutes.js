const express = require("express");
const { generateDocumentationHTML } = require("../templates/documentationTemplate");

const router = express.Router();

router.get("/", (req, res) => {
	const port = process.env.PORT || 3140;
	const html = generateDocumentationHTML(port);
	res.send(html);
});

module.exports = router;
