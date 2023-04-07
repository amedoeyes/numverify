import axios from "axios";
import { Router } from "express";
import PhoneNumber from "../models/PhoneNumber";
import config from "../utils/config";

const phoneNumbersRouter = Router();

phoneNumbersRouter.post("/validate", async (req, res) => {
	try {
		const number = req.body.number;
		const response = await axios.get(
			`https://api.apilayer.com/number_verification/validate?apikey=${config.NUMVERIFY_API_KEY}&number=${number}`
		);
		response.data.date = new Date();
		const phoneNumber = new PhoneNumber(response.data);
		await phoneNumber.save();
		res.json(phoneNumber);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

phoneNumbersRouter.get("/", async (req, res) => {
	try {
		const phoneNumbers = await PhoneNumber.find().sort({ date: -1 });
		res.json(phoneNumbers);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default phoneNumbersRouter;
