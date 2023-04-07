import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import historyReducer from "./features/phoneNumbers/historySlice";
import validationReducer from "./features/phoneNumbers/validationSlice";

const store = configureStore({
	reducer: {
		account: accountReducer,
		validation: validationReducer,
		history: historyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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
	id: string;
};

export default store;
