const mongoose = require("mongoose");

const endpoint = process.env.MONGO_URI || "mongodb://localhost/fullstack-app";

mongoose
	.connect(endpoint)
	.then((db) => console.log("DB connected: ", db.connection.name))
	.catch((e) => console.error(e));
