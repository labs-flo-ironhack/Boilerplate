const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: String,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

module.exports = model("User", userSchema);
