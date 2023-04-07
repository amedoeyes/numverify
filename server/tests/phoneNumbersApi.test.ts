import app from "../index";
import supertest from "supertest";
import mongoose from "mongoose";
import PhoneNumber from "../models/PhoneNumber";

const api = supertest(app);

beforeAll(async () => {
	await PhoneNumber.deleteMany({});
});

test("verify the phone number and add it to the database", async () => {
	const response = await api
		.post("/api/phone-numbers/validate")
		.send({ number: "14158586273" });
	expect(response.status).toBe(200);
	expect(response.body.carrier).toBe("AT&T Mobility LLC");
	expect(response.body.country_code).toBe("US");
	expect(response.body.country_name).toBe("United States of America");
	expect(response.body.country_prefix).toBe("+1");
	expect(response.body.international_format).toBe("+14158586273");
	expect(response.body.line_type).toBe("mobile");
	expect(response.body.local_format).toBe("4158586273");
	expect(response.body.location).toBe("Novato");
	expect(response.body.number).toBe("14158586273");
	expect(response.body.valid).toBe(true);

	const phoneNumber = await PhoneNumber.findOne({
		number: "14158586273",
	});
	if (phoneNumber) {
		expect(phoneNumber.carrier).toBe("AT&T Mobility LLC");
		expect(phoneNumber.country_code).toBe("US");
		expect(phoneNumber.country_name).toBe("United States of America");
		expect(phoneNumber.country_prefix).toBe("+1");
		expect(phoneNumber.international_format).toBe("+14158586273");
		expect(phoneNumber.line_type).toBe("mobile");
		expect(phoneNumber.local_format).toBe("4158586273");
		expect(phoneNumber.location).toBe("Novato");
		expect(phoneNumber.number).toBe("14158586273");
		expect(phoneNumber.valid).toBe(true);
	} else fail("phone number is null");
});

test("retrieve all phone numbers from database and verify its' data", async () => {
	const response = await api.get("/api/phone-numbers");
	expect(response.status).toBe(200);
	expect(response.body.length).toBe(1);

	expect(response.body[0].carrier).toBe("AT&T Mobility LLC");
	expect(response.body[0].country_code).toBe("US");
	expect(response.body[0].country_name).toBe("United States of America");
	expect(response.body[0].country_prefix).toBe("+1");
	expect(response.body[0].international_format).toBe("+14158586273");
	expect(response.body[0].line_type).toBe("mobile");
	expect(response.body[0].local_format).toBe("4158586273");
	expect(response.body[0].location).toBe("Novato");
	expect(response.body[0].number).toBe("14158586273");
	expect(response.body[0].valid).toBe(true);
});

afterAll(() => mongoose.connection.close());
