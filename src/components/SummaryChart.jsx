import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider"

const SummaryChart = () => {
	const { expenses, userSetting } = useStateContext()
	const [spent, setSpent] = useState(0)

	useEffect(() => {
		let sum = 0
		expenses.forEach((e) => (sum += e.amount))
		setSpent(sum)
	}, [expenses, userSetting])

	return (
		<div>
			<div
				className="radial-progress text-secondary"
				style={{
					"--value": (spent / userSetting.budget) * 100,
					"--size": "12rem",
					"--thickness": "15px",
				}}>
				{`${((spent / userSetting.budget) * 100).toFixed(2)}% spent`}
			</div>
			<div className="text-center mt-4 font-bold">
				<h2>{`Total Spent: ${spent}`}</h2>
				<h2>{`Amount remaining: ${userSetting.budget - spent}`}</h2>
			</div>
		</div>
	)
}

export default SummaryChart
