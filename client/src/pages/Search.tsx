import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import requireAuth from "../components/requireAuth";
import { validatePhoneNumber } from "../features/phoneNumbers/validationSlice";
import { AppDispatch, RootState } from "../store";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import PhoneNumberTable from "../components/PhoneNumberTable";
import "../styles/search.css";

function Search() {
	const [number, setNumber] = useState("");
	const phoneNumber = useSelector(
		(state: RootState) => state.validation.phoneNumber
	);
	const status = useSelector((state: RootState) => state.validation.status);
	const error = useSelector((state: RootState) => state.validation.error);
	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNumber(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(validatePhoneNumber(number));
	};

	return (
		<div className="search">
			<div
				className={`search__body  ${
					status === "succeeded" && "search__body--succeeded"
				}`}
			>
				<h2>
					<FormattedMessage id="search.title" />
				</h2>
				<form className="search__form" onSubmit={handleSubmit}>
					<input
						className="search__input"
						type="text"
						value={number}
						onChange={handleChange}
						pattern="[0-9]*"
						inputMode="numeric"
						required
						disabled={status === "loading"}
					/>
					<button
						className="search__button"
						type="submit"
						disabled={status === "loading"}
					>
						{status === "loading" ? (
							<svg
								className="search__loading-spinner"
								viewBox="0 0 50 50"
							>
								<circle
									cx="25"
									cy="25"
									r="20"
									fill="none"
									strokeWidth="5"
								></circle>
							</svg>
						) : (
							<FaSearch />
						)}
					</button>
				</form>

				{status === "failed" && (
					<div className="search__error">
						<p>
							<FormattedMessage id="search.error" />
						</p>
						<p>{error}</p>
					</div>
				)}

				{status === "succeeded" && phoneNumber && (
					<PhoneNumberTable phoneNumber={phoneNumber} />
				)}
			</div>
		</div>
	);
}

export default requireAuth(Search);
