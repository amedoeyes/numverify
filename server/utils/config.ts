require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
	process.env.NODE_ENV === "testing"
		? process.env.TEST_MONGODB_URI
		: process.env.MONGODB_URI;
const NUMVERIFY_API_KEY = process.env.NUMVERIFY_API_KEY;

export default {
	PORT,
	MONGODB_URI,
	NUMVERIFY_API_KEY,
};
