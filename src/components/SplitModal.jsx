import React, { useRef } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const SplitTable = ({ split }) => {
	return (
		<tbody>
			{split.map((sp, i) => (
				<tr key={i}>
					<td>{sp.name}</td>
					<td>{sp.email}</td>
					<td>{sp.paid ? "Paid" : "Unpaid"}</td>
				</tr>
			))}
		</tbody>
	)
}

const SplitModal = ({ splitExpense }) => {
	const modalRefSplit = useRef()
	const { showToastHandler, setExpenses } = useStateContext()

	return (
		<div>
			<input
				type="checkbox"
				id="my-modal-3"
				className="modal-toggle"
				ref={modalRefSplit}
			/>
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal-3"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="font-bold text-lg">Split your expense</h3>
					{splitExpense ? (
						<div>
							<table className="table table-zebra w-full">
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Status</th>
									</tr>
								</thead>
								<SplitTable split={splitExpense.split} />
							</table>
						</div>
					) : (
						<div />
					)}
					<Formik
						initialValues={{
							name: "",
						}}
						enableReinitialize
						validate={(values) => {
							const errors = {}
							if (!values.name) errors.name = "Required"

							return errors
						}}
						onSubmit={async (values) => {
							try {
								await axios.post(
									"/api/v1/expenses/split-expense",
									{
										expenseId: splitExpense._id,
										payload: {
											name: values.name,
											email: "",
											paid: false,
										},
									}
								)
								const newSplit = splitExpense.split.push({
									name: values.name,
									email: "",
									paid: false,
								})
								setExpenses((prev) => {
									return prev.map((exp) =>
										exp._id === splitExpense._id
											? {
													...exp,
													split: newSplit,
											  }
											: exp
									)
								})
								showToastHandler("Expense split", "success")
								modalRefSplit.current.checked = false
							} catch (error) {
								showToastHandler("Split failed", "error")
								console.log(error)
							}
						}}>
						<Form>
							<div className="form-control">
								<label htmlFor="name" className="label">
									Name
								</label>
								<Field
									id="name"
									name="name"
									className="input input-bordered"
								/>
								<ErrorMessage
									name="name"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-warning">
									split
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default SplitModal
