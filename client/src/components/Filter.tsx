import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredPhoneNumbers } from "../features/phoneNumbers/historySlice";
import { RootState } from "../store";
import "../styles/filter.css";

export default function Filter() {
	const [filters, setFilters] = useState({
		date: "descending",
		valid: "all",
		search: "",
	});
	const phoneNumbers = useSelector(
		(state: RootState) => state.history.phoneNumbers
	);

	const dispatch = useDispatch();

	useEffect(() => {
		let filteredPhoneNumbers = phoneNumbers.filter((phoneNumber) => {
			if (filters.valid === "all") return true;

			if (
				(filters.valid === "valid" && phoneNumber.valid) ||
				(filters.valid === "invalid" && !phoneNumber.valid)
			)
				return true;

			return false;
		});

		if (filters.date === "descending") {
			filteredPhoneNumbers.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			);
		} else {
			filteredPhoneNumbers.sort(
				(a, b) =>
					new Date(a.date).getTime() - new Date(b.date).getTime()
			);
		}

		if (filters.search) {
			filteredPhoneNumbers = filteredPhoneNumbers.filter((phoneNumber) =>
				Object.values(phoneNumber).some((value) =>
					value
						? value
								.toString()
								.toLowerCase()
								.includes(filters.search.toLowerCase())
						: null
				)
			);
		}

		dispatch(setFilteredPhoneNumbers(filteredPhoneNumbers));
	}, [filters]);

	const handleChange = (
		event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	return (
		<div className="filter">
			<div className="filter__options">
				<div className="filter__option">
					<label htmlFor="date">
						<FormattedMessage id="history.filter.date.label" />
					</label>
					<select
						className="filter__select"
						name="date"
						id="date"
						value={filters.date}
						onChange={handleChange}
					>
						<option value="descending">
							<FormattedMessage id="history.filter.date.descending" />
						</option>
						<option value="ascending">
							<FormattedMessage id="history.filter.date.ascending" />
						</option>
					</select>
				</div>
				<div className="filter__option">
					<label htmlFor="valid">
						<FormattedMessage id="history.filter.valid.label" />
					</label>
					<select
						className="filter__select"
						name="valid"
						id="valid"
						value={filters.valid}
						onChange={handleChange}
					>
						<option value="all">
							<FormattedMessage id="history.filter.valid.all" />
						</option>
						<option value="valid">
							<FormattedMessage id="history.filter.valid.valid" />
						</option>
						<option value="invalid">
							<FormattedMessage id="history.filter.valid.invalid" />
						</option>
					</select>
				</div>
				<div className="filter__option">
					<label htmlFor="search">
						<FormattedMessage id="history.filter.search.label" />
					</label>
					<input
						className="filter__input"
						type="text"
						name="search"
						id="search"
						value={filters.search}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
}
