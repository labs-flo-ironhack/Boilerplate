const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];

		jwt.verify(token, "privatekey", (err, authorizedData) => {
			if (err) {
				//If error send Forbidden (403)
				console.log("ERROR: Could not connect to the protected route");
				res.sendStatus(403);
			} else {
				//If token is successfully verified, we can send the autorized data
				res.json({
					message: "Successful log in",
					authorizedData,
				});
				console.log("SUCCESS: Connected to protected route");
			}
		});
	} else {
		res.sendStatus(403);
	}
};

module.exports = protectRoute;
