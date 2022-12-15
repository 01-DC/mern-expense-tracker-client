import React from "react"
import AddNew from "../components/AddNew"
import SummaryChart from "../components/SummaryChart"
import ExpenseTable from "../components/ExpenseTable"

const HomePage = () => {
	return (
		<div className="p-8">
			<div className="flex items-center justify-around">
				<AddNew />
				<SummaryChart />
			</div>
			<ExpenseTable />
		</div>
	)
}

export default HomePage
