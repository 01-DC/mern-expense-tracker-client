import React from "react"
import { Routes, Route } from "react-router-dom"

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
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
