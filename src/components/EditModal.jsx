import React, { useRef } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const EditModal = ({ editableExpense }) => {
	const modalRefEdit = useRef()
	const { userSetting, showToastHandler, setExpenses } = useStateContext()

	return (
		<div>
			<input
				type="checkbox"
				id="my-modal-2"
				className="modal-toggle"
				ref={modalRefEdit}
			/>
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
						onSubmit={async (values) => {
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
								showToastHandler("Expense updated", "success")
								modalRefEdit.current.checked = false
							} catch (error) {
								showToastHandler("Update failed", "error")
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
									className="btn btn-warning">
									save edit
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default EditModal
