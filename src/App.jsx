import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Toast from "./components/Toast"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoutes>
							<HomePage />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoutes>
							<SettingsPage />
						</ProtectedRoutes>
					}
				/>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
			<Footer />
			<Toast />
		</div>
	)
}

export function ProtectedRoutes(props) {
	if (localStorage.getItem("user")) return props.children
	else return <Navigate to="/login" />
}

export default App
