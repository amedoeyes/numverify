import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

export default function requireAuth(Component: any) {
	const Wrapper = (props: any) => {
		const isLoggedIn = useSelector(
			(state: RootState) => state.account.isLoggedIn
		);

		if (!isLoggedIn) return <Navigate to="/login" />;

		return <Component {...props} />;
	};

	return Wrapper;
}
