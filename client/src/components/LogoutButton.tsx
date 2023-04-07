import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { logout } from "../features/account/accountSlice";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";

export default function LogoutButton() {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(logout());
	};

	return (
		<button className="logout-button" onClick={handleClick}>
			<FaSignOutAlt />
			<FormattedMessage id="account.logout" />
		</button>
	);
}
