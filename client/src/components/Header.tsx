import { FormattedMessage } from "react-intl";
import LogoutButton from "./LogoutButton";
import { FaHistory } from "@react-icons/all-files/fa/FaHistory";
import "../styles/header.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Header() {
	const isLoggedIn = useSelector(
		(state: RootState) => state.account.isLoggedIn
	);
	return (
		<header className="header">
			<nav className="header__nav">
				<a className="header__brand header__link" href="/">
					numverify
				</a>
				<div className="header__actions">
					<a className="header__link" href="/history">
						<FaHistory />
						<FormattedMessage id="nav.history" />
					</a>
					{isLoggedIn && <LogoutButton />}
				</div>
			</nav>
		</header>
	);
}
