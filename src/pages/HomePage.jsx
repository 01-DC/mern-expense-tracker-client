import React, { useEffect } from "react"
import AddNew from "../components/AddNew"
import SummaryChart from "../components/SummaryChart"
import ExpenseTable from "../components/ExpenseTable"
import { useStateContext } from "../contexts/ContextProvider"
import axios from "axios"

const HomePage = () => {
	const { loginUser, setExpenses } = useStateContext()

	const getAllExpenses = async () => {
		try {
			const userid = loginUser.email
			const res = await axios.post("/api/v1/expenses/get-expense", {
				userid,
			})
			setExpenses(res.data)
			// console.log(res.data)
		} catch (error) {
			alert("Fetching expenses failed")
			console.log(error)
		}
	}

	useEffect(() => {
		getAllExpenses()
	}, [])

	return (
		<div className="p-8">
			<div className="flex flex-col-reverse md:flex-row items-center justify-around">
				<AddNew />
				<SummaryChart />
			</div>
			<ExpenseTable />
		</div>
	)
}

export default HomePage
