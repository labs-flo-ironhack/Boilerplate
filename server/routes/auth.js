const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const saltRounds = 10;

/**
 *
 * * All the routes are prefixed with `/api/auth`
 *
 */

router.post("/signup", async (req, res, next) => {
	const { name, email, password } = req.body;
	if (email === "" || name === "" || password === "") {
		res
			.status(400)
			.json({ message: "I need some informations to work with here!" });
	}

	// ! To use only if you want to enforce strong password (not during dev-time)

	// const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

	// if (!regex.test(password)) {
	// 	return res
	// 		.status(400)
	// 		.json({
	// 			message:
	// 				"Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
	// 		});
	// }

	try {
		const foundUser = await User.findOne({ email });
		if (foundUser) {
			res
				.status(400)
				.json({ message: "There's another one of you, somewhere." });
			return;
		}
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPass = bcrypt.hashSync(password, salt);

		const createdUser = await User.create({
			name,
			email,
			password: hashedPass,
		});

		const user = createdUser.toObject();
		delete user.password;
		// ! Sending the user as json to the client
		res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		if (error instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: "Sweet, sweet 500." });
	}
});

router.post("/signin", async (req, res, next) => {
	const { email, password } = req.body;
	if (email === "" || password === "") {
		res
			.status(400)
			.json({ message: "I need some informations to work with here!" });
	}
	try {
		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			res.status.apply(401).json({ message: "You're not yourself." });
			return;
		}
		const goodPass = bcrypt.compareSync(password, foundUser.password);
		if (goodPass) {
			const user = foundUser.toObject();
			delete user.password;

			/**
			 * Sign method allow you to create the token.
			 *
			 * ---
			 *
			 * - First argument: user, should be an object. It is our payload !
			 * - Second argument: A-really-long-random-string...
			 * - Third argument: Options...
			 */

			const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
				algorithm: "HS256",
				expiresIn: "2d",
			});

			//! Sending the authToken to the client !

			res.status(200).json({ authToken });
		} else {
			res.status(401).json("Can you check your typos ?");
		}
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Oh noes ! Something went terribly wrong !" });
	}
});

router.get("/me", isAuthenticated, (req, res, next) => {
	// console.log("req payload", req.payload);
	res.status(200).json(req.payload);
});

module.exports = router;
