import config from "./utils/config";
import express from "express";
import cors from "cors";
import middleware from "./utils/middleware";
import mongoose from "mongoose";
import path from "path";
import phoneNumbersRouter from "./controllers/phoneNumbers";

if (config.MONGODB_URI) {
	console.log("connecting to", config.MONGODB_URI);

	mongoose
		.connect(config.MONGODB_URI)
		.then(() => console.log("connected to MongoDB"))
		.catch((err) =>
			console.error("error connecting to MongoDB", err.message)
		);
} else console.error("MongoDB URI not provided");

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/phone-numbers", phoneNumbersRouter);

const client =
	process.env.NODE_ENV === "development"
		? path.join(__dirname, "../client/dist")
		: path.join(__dirname, "./client/");

app.use(express.static(client));
app.use("*", (req, res) => res.sendFile(path.join(client, "index.html")));

app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});

export default app;
