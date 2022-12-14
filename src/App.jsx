import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
	return (
		<>
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
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
			<Footer />
		</>
	)
}

export function ProtectedRoutes(props) {
	if (localStorage.getItem("user")) return props.children
	else return <Navigate to="/login" />
}

export default App
