import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

const Header = () => {
	const navigate = useNavigate()
	const { loginUser, setLoginUser, setUserSetting, showToastHandler } =
		useStateContext()

	const logoutHandler = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("setting")
		setLoginUser("")
		setUserSetting("")
		showToastHandler("Logout successful", "success")
		navigate("/login")
	}
	return (
		<div className="navbar bg-base-100 py-4 sticky top-0 backdrop-blur bg-opacity-50 z-50">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					{loginUser && (
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-box w-52 gap-4">
							<li>
								<Link
									to="/settings"
									className="btn btn-outline btn-secondary">
									Settings
								</Link>
							</li>

							<li>
								<button
									className="btn btn-outline btn-primary"
									onClick={logoutHandler}>
									Logout
								</button>
							</li>
						</ul>
					)}
				</div>
				<Link to="/" className="btn glass normal-case sm:text-xl">
					Expense Tracker
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				{loginUser && (
					<ul className="menu menu-horizontal px-1 gap-3">
						<li>
							<Link
								to="/settings"
								className="btn btn-outline btn-secondary">
								Settings
							</Link>
						</li>

						<li>
							<button
								className="btn btn-outline btn-primary"
								onClick={logoutHandler}>
								Logout
							</button>
						</li>
					</ul>
				)}
			</div>
			<div className="navbar-end">
				<div className="btn btn-ghost normal-case sm:text-xl text-accent">
					{loginUser
						? `Welcome ${loginUser.name.replace(/ .*/, "")}`
						: "Hello there"}
				</div>
			</div>
		</div>
	)
}

export default Header
