import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import History from "./pages/History";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import store from "./store";
import messages from "./utils/messages";

function App() {
	const locale = "en";

	return (
		<IntlProvider
			locale={locale}
			messages={messages[locale]}
			defaultLocale="en"
		>
			<Provider store={store}>
				<Routes>
					<Route path="/">
						<Route path="/login" element={<Login />} />
						<Route
							element={
								<>
									<Header />
									<Outlet />
								</>
							}
						>
							<Route path="/" element={<Search />} />
							<Route path="/history" element={<History />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Provider>
		</IntlProvider>
	);
}

export default App;
