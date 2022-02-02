import axios from "axios";

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BACKEND_URL,
	withCredentials: true,
});

//! Error handling to use in the catch
function errorHandler(error) {
	if (error.response.data) {
		console.log(error.response && error.response.data);
		throw error;
	}
	throw error;
}

const apiHandler = {
	// Service is spread to have access to the basics get/post...
	...service,

	signup(userInfo) {
		return service
			.post("/api/auth/signup", userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},
	isLoggedIn(token) {
		return service
			.get("/api/auth/me", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => res.data)
			.catch(errorHandler);
	},

	signin(userInfo) {
		return service
			.post("/api/auth/signin", userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	// getAllTheCats() {
	// 	return service
	// 		.get("/api/cats")
	// 		.then((res) => res.data)
	// 		.catch(errorHandler);
	// },
};

export default apiHandler;
