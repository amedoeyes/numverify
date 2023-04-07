import mongoose from "mongoose";

export type IPhoneNumber = {
	carrier: string;
	country_code: string;
	country_name: string;
	country_prefix: string;
	international_format: string;
	line_type: string;
	local_format: string;
	location: string;
	number: string;
	valid: boolean;
	date: Date;
};

const PhoneNumberSchema = new mongoose.Schema<IPhoneNumber>({
	carrier: String,
	country_code: String,
	country_name: String,
	country_prefix: String,
	international_format: String,
	line_type: String,
	local_format: String,
	location: String,
	number: String,
	valid: Boolean,
	date: Date,
});

PhoneNumberSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model<IPhoneNumber>("PhoneNumber", PhoneNumberSchema);
