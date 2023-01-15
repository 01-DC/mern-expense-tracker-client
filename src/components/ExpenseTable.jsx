import React, { useState } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import axios from "axios"
import EditModal from "./EditModal"
import SplitModal from "./SplitModal"

const ExpenseTable = () => {
	const { expenses, setExpenses, showToastHandler } = useStateContext()
	const [editableExpense, setEditableExpense] = useState("")
	const [splitExpense, setSplitExpense] = useState("")

	const deleteHandler = async (exp) => {
		try {
			await axios.post("/api/v1/expenses/delete-expense", {
				expenseId: exp._id,
			})
			setExpenses((prev) => {
				return prev.filter((p) => exp._id !== p._id)
			})
			showToastHandler("Expense Deleted", "success")
		} catch (error) {
			showToastHandler("Delete failed", "error")
			console.log(error)
		}
	}

	return (
		<div className="overflow-x-auto my-8">
			<h2 className="font-bold text-2xl text-center my-4 text-secondary">
				Your Expenses
			</h2>
			<table className="table table-zebra w-full">
				<thead>
					<tr>
						<th></th>
						<th>Amount</th>
						<th>Category</th>
						<th>Description</th>
						<th>Modify</th>
					</tr>
				</thead>
				<tbody>
					{expenses?.map((exp, i) => (
						<tr key={i}>
							<th>{i + 1}</th>
							<td>{exp.amount}</td>
							<td>{exp.category}</td>
							<td>{exp.description}</td>
							<td>
								<label
									htmlFor="my-modal-3"
									className="btn btn-sm btn-info m-1"
									onClick={() => setSplitExpense(exp)}>
									Split
								</label>
								<button
									className="btn btn-sm btn-error m-1"
									onClick={() => deleteHandler(exp)}>
									Delete
								</button>
								<label
									htmlFor="my-modal-2"
									className="btn btn-sm btn-warning m-1"
									onClick={() => setEditableExpense(exp)}>
									Edit
								</label>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditModal editableExpense={editableExpense} />
			<SplitModal splitExpense={splitExpense} />
		</div>
	)
}

export default ExpenseTable
