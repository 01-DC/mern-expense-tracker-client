import React, { useEffect } from "react"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const SettingsPage = () => {
	const { userSetting, setUserSettingHandler } = useStateContext()

	return (
		<div className="p-8">
			<div className="card-body items-center">
				<h2 className="card-title">Your Budget</h2>
				<p className="stat-value my-4">${userSetting.budget}</p>

				<button className="btn btn-primary">Update Budget</button>
			</div>

			<div className="overflow-x-auto">
				<h2>Your Categories</h2>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th></th>
							<th>Category</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userSetting?.categories.map((cat, i) => (
							<tr key={i}>
								<th>{i}</th>
								<td>{cat}</td>
								<td>
									<button>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default SettingsPage
