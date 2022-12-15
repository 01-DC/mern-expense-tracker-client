import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

const Header = () => {
	const navigate = useNavigate()
	const { loginUser, setLoginUser, setUserSetting } = useStateContext()

	const logoutHandler = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("setting")
		setLoginUser("")
		setUserSetting("")
		navigate("/login")
	}
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					Expense Tracker
				</Link>
			</div>
			<div className="navbar-center">
				<div className="btn btn-ghost normal-case text-xl text-accent">
					{loginUser ? `Welcome ${loginUser.name}` : "Hello there"}
				</div>
			</div>
			<div className="navbar-end">
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
			</div>
		</div>
	)
}

export default Header
