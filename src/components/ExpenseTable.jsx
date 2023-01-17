import React, { useState } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import axios from "axios"
import EditModal from "./EditModal"
import SplitModal from "./SplitModal"

const ExpenseTable = () => {
	const {
		loginUser,
		expenses,
		setExpenses,
		showToastHandler,
		splitExpenses,
		setSplitExpenses,
	} = useStateContext()
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

	const statusToggleHandler = async (sp) => {
		try {
			const spl = sp.split.filter((e) => e.email === loginUser.email)[0]
			await axios.post("/api/v1/expenses/toggle-split", {
				splitId: spl._id,
				status: !spl.paid,
			})

			setSplitExpenses((prev) => {
				return prev.map((exp) =>
					exp._id === sp._id
						? {
								...exp,
								split: exp.split.map((s) =>
									s._id === spl._id
										? {
												...s,
												paid: !s.paid,
										  }
										: s
								),
						  }
						: exp
				)
			})

			showToastHandler("Toggle successful", "success")
		} catch (error) {
			showToastHandler("Toggle failed", "error")
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
						<th>Amount</th>
						<th>Category</th>
						<th>Description</th>
						<th>Modify</th>
					</tr>
				</thead>
				<tbody>
					{expenses?.map((exp, i) => (
						<tr key={i}>
							<td>
								{exp.split.length > 0
									? `${(
											exp.amount / exp.split.length
									  ).toFixed(2)} (${exp.amount})`
									: `${exp.amount}`}
							</td>
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
					{splitExpenses?.map((exp, i) => (
						<tr key={i}>
							<td>
								{`${(exp.amount / exp.split.length).toFixed(
									2
								)} (${exp.amount})`}
							</td>
							<td>{exp.category}</td>
							<td>{exp.description}</td>
							<td>
								{exp.split.filter(
									(e) => e.email === loginUser.email
								)[0].paid ? (
									<div />
								) : (
									<button
										className="btn btn-sm btn-info m-1"
										onClick={() =>
											statusToggleHandler(exp)
										}>
										mark paid
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditModal editableExpense={editableExpense} />
			<SplitModal
				splitExpense={splitExpense}
				setSplitExpense={setSplitExpense}
			/>
		</div>
	)
}

export default ExpenseTable
