import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/account/accountSlice";
import { FaUserAlt } from "@react-icons/all-files/fa/FaUserAlt";
import { RiLockPasswordFill } from "@react-icons/all-files/ri/RiLockPasswordFill";
import "../styles/login.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		if (id === "username") {
			setUsername(value);
		} else if (id === "password") {
			setPassword(value);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login());
		navigate("/");
	};

	return (
		<div className="login">
			<h1>
				<FormattedMessage id="login.title" />
			</h1>
			<form className="login__form" onSubmit={handleSubmit}>
				<div className="login__field">
					<label className="login__label" htmlFor="username">
						<FaUserAlt />
						<FormattedMessage id="login.username.label" />
					</label>
					<input
						className="login__input"
						id="username"
						type="text"
						value={username}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="login__field">
					<label className="login__label" htmlFor="password">
						<RiLockPasswordFill />
						<FormattedMessage id="login.password.label" />
					</label>
					<input
						className="login__input"
						id="password"
						type="password"
						value={password}
						onChange={handleChange}
						required
					/>
				</div>
				<button className="login__button" type="submit">
					<FormattedMessage id="login.submit" />
				</button>
			</form>
		</div>
	);
}
