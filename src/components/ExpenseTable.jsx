import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useStateContext } from "../contexts/ContextProvider"
import axios from "axios"

const ExpenseTable = () => {
	const { expenses, setExpenses, userSetting } = useStateContext()
	const [editableExpense, setEditableExpense] = useState("")

	const deleteHandler = async (exp) => {
		try {
			await axios.post("/api/v1/expenses/delete-expense", {
				expenseId: exp._id,
			})
			setExpenses((prev) => {
				return prev.filter((p) => exp._id !== p._id)
			})
		} catch (error) {
			alert("Delete failed")
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
			<input type="checkbox" id="my-modal-2" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal-2"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="font-bold text-lg">
						Update details of expense
					</h3>

					<Formik
						initialValues={{
							amount: editableExpense.amount,
							category: editableExpense.category,
							description: editableExpense.description,
						}}
						enableReinitialize
						validate={(values) => {
							const errors = {}
							if (values.amount === 0)
								errors.amount = "Expense cannot be zero"
							if (values.category === "--")
								errors.category = "Select valid category"
							if (!values.description)
								errors.description = "Required"

							return errors
						}}
						onSubmit={async (values, actions) => {
							try {
								await axios.post(
									"/api/v1/expenses/edit-expense",
									{
										expenseId: editableExpense._id,
										payload: {
											...values,
											userid: editableExpense.userid,
										},
									}
								)
								setExpenses((prev) => {
									return prev.map((exp) =>
										exp._id === editableExpense._id
											? {
													...exp,
													amount: values.amount,
													category: values.category,
													description:
														values.description,
											  }
											: exp
									)
								})
							} catch (error) {
								alert("Update failed")
								console.log(error)
							}
						}}>
						<Form>
							<div className="form-control">
								<label htmlFor="amount" className="label">
									Amount
								</label>
								<Field
									id="amount"
									name="amount"
									className="input input-bordered"
									type="number"
								/>
								<ErrorMessage
									name="amount"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control">
								<label htmlFor="category" className="label">
									Category
								</label>
								<Field
									id="category"
									name="category"
									className="input input-bordered"
									as="select">
									{userSetting.categories.map((cat, i) => (
										<option key={i} value={cat}>
											{cat}
										</option>
									))}
								</Field>
								<ErrorMessage
									name="category"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control">
								<label htmlFor="description" className="label">
									Description
								</label>
								<Field
									id="description"
									name="description"
									className="input input-bordered"
								/>
								<ErrorMessage
									name="description"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-primary">
									save
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default ExpenseTable
