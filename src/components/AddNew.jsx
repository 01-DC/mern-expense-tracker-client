import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const AddNew = () => {
	const { loginUser, expenses, setExpenses, userSetting, showToastHandler } =
		useStateContext()

	return (
		<div className="mt-4 md:mt-0">
			<label htmlFor="my-modal" className="btn btn-lg btn-primary">
				add new expense
			</label>

			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="font-bold text-lg">
						Add details of new expense
					</h3>

					<Formik
						initialValues={{
							amount: "",
							category: "--",
							description: "",
						}}
						validate={(values) => {
							const errors = {}
							let sum = 0
							expenses.forEach((e) => (sum += e.amount))

							if (parseInt(values.amount) <= 0)
								errors.amount = "Expense cannot be zero or less"
							else if (
								parseInt(values.amount) >
								userSetting.budget - sum
							)
								errors.amount =
									"Expense cannot be more than budget"

							if (values.category === "--")
								errors.category = "Select valid category"
							if (!values.description)
								errors.description = "Required"

							return errors
						}}
						onSubmit={async (values, actions) => {
							try {
								const { data } = await axios.post(
									"/api/v1/expenses/add-expense",
									{
										userid: loginUser.email,
										...values,
									}
								)
								setExpenses((prev) => {
									return [...prev, data]
								})
								showToastHandler("Expense Saved", "success")
								actions.resetForm()
							} catch (error) {
								showToastHandler("Save failed", "error")
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
									placeholder={0}
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
									<option value="--">--</option>
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

export default AddNew
