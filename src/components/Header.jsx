import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
	const navigate = useNavigate()

	const logoutHandler = () => {
		localStorage.removeItem("user")
		navigate("/login")
	}
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					Expense Tracker
				</Link>
			</div>
			<div className="flex-none">
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
