import React, { useRef } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"
import SplitTable from "./SplitTable"

const SplitModal = ({ splitExpense, setSplitExpense }) => {
	const modalRefSplit = useRef()
	const { loginUser, showToastHandler, setExpenses } = useStateContext()

	return (
		<div>
			<input
				type="checkbox"
				id="my-modal-3"
				className="modal-toggle"
				ref={modalRefSplit}
			/>
			<div className="modal">
				<div className="modal-box max-w-2xl">
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
								<SplitTable
									setSplitExpense={setSplitExpense}
									splitExpense={splitExpense}
									modalRefSplit={modalRefSplit}
								/>
							</table>
						</div>
					) : (
						<div />
					)}
					{/* Name Checker */}
					<Formik
						initialValues={{
							name: "",
						}}
						validate={(values) => {
							const errors = {}
							if (!values.name) errors.name = "Required"

							return errors
						}}
						onSubmit={async (values, { resetForm }) => {
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
								setSplitExpense((prev) => {
									prev.split.push({
										name: values.name,
										email: "",
										paid: false,
									})
								})

								setExpenses((prev) => {
									return prev.map((exp) =>
										exp._id === splitExpense._id
											? {
													...exp,
													split: [
														...exp.split,
														{
															name: values.name,
															email: "",
															paid: false,
														},
													],
											  }
											: exp
									)
								})
								showToastHandler("Expense split", "success")
								resetForm()
								modalRefSplit.current.checked = false
							} catch (error) {
								showToastHandler("Split failed", "error")
								console.log(error)
								resetForm()
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
					{/* Email Checker */}
					<Formik
						initialValues={{
							email: "",
						}}
						validate={(values) => {
							const errors = {}
							if (!values.email) errors.email = "Required"
							else if (values.email === loginUser.email)
								errors.email = "Cannot split with yourself"
							else {
								if (
									splitExpense.split.filter(
										(spl) => spl.email === values.email
									).length > 0
								)
									errors.email =
										"Already split with this user"
							}

							return errors
						}}
						onSubmit={async (values, { resetForm }) => {
							try {
								const res = await axios.post(
									"/api/v1/users/find-user",
									values
								)
								const { success } = res.data

								if (success) {
									const { user } = res.data

									await axios.post(
										"/api/v1/expenses/split-expense",
										{
											expenseId: splitExpense._id,
											payload: {
												name: user.name,
												email: values.email,
												paid: false,
											},
										}
									)
									setSplitExpense((prev) => {
										prev.split.push({
											name: user.name,
											email: values.email,
											paid: false,
										})
									})

									setExpenses((prev) => {
										return prev.map((exp) =>
											exp._id === splitExpense._id
												? {
														...exp,
														split: [
															...exp.split,
															{
																name: user.name,
																email: values.email,
																paid: false,
															},
														],
												  }
												: exp
										)
									})
									showToastHandler("Expense split", "success")
									resetForm()
									modalRefSplit.current.checked = false
								} else {
									showToastHandler(
										"User does not exist",
										"error"
									)
									resetForm()
								}
							} catch (error) {
								showToastHandler("Split failed", "error")
								console.log(error)
								resetForm()
							}
						}}>
						<Form>
							<div className="form-control">
								<label htmlFor="email" className="label">
									Email
								</label>
								<Field
									id="email"
									name="email"
									className="input input-bordered"
								/>
								<ErrorMessage
									name="email"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-warning">
									check user & split
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
