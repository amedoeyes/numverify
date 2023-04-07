import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import PhoneNumberTable from "../components/PhoneNumberTable";
import PhoneNumberTableSkeleton from "../components/phoneNumberTableSkeleton";
import { fetchPhoneNumbers } from "../features/phoneNumbers/historySlice";
import { AppDispatch, RootState } from "../store";
import "../styles/history.css";

export default function History() {
	const filteredPhoneNumbers = useSelector(
		(state: RootState) => state.history.filteredPhoneNumbers
	);
	const status = useSelector((state: RootState) => state.history.status);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchPhoneNumbers());
	}, []);

	return (
		<div className="history">
			<h2 className="history__title">
				<FormattedMessage id="history.title" />
			</h2>
			<Filter />
			<div className="history__list">
				{status === "loading" &&
					Array(10)
						.fill(0)
						.map((_, index) => (
							<PhoneNumberTableSkeleton key={index} />
						))}
				{filteredPhoneNumbers.map((phoneNumber) => (
					<PhoneNumberTable
						key={phoneNumber.id}
						phoneNumber={phoneNumber}
					/>
				))}
			</div>
		</div>
	);
}
